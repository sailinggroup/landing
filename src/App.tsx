import { Component, onMount, onCleanup, createSignal, For } from 'solid-js'
import { initFluidCursor } from './lib/fluidCursor'
import Particles from './components/Particles'

const App: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let cleanup: (() => void) | undefined;
  const [activeCrewIndex, setActiveCrewIndex] = createSignal(0);
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [activeRotation, setActiveRotation] = createSignal(0); // deg, -15..15
  const [throwX, setThrowX] = createSignal(0); // px, -40..40
  const [animAlt, setAnimAlt] = createSignal(false); // toggle to force CSS animation restart
  const [playedCards, setPlayedCards] = createSignal<number[]>([0]); // Track which cards have been played
  const [lastActiveIndex, setLastActiveIndex] = createSignal<number | null>(null); // track previously active card
  const [showDiscordBanner, setShowDiscordBanner] = createSignal(false);
  let autoRotateInterval: number;

  const crewMembers = [
    {
      name: 'RHW',
      rank: 'Captain',
      link: 'https://rhw.one',
      linkText: 'rhw.one',
      image: 'https://rhw.one/logoSquare.png',
      description: 'Second UBG site, experienced, has cool ideas'
    },
    {
      name: 'ThinLiquid',
      rank: 'First Mate',
      link: 'https://thinliquid.dev',
      linkText: 'thinliquid.dev',
      image: 'https://cdn.jsdelivr.net/gh/ThinLiquid/site@master/public/icon.png',
      description: 'Website maker and mini sysadmin, founded the now deprecated Flow WebOS'
    },
    {
      name: 'Technonyte',
      rank: 'Navigator',
      link: 'https://techo.pics',
      linkText: 'techo.pics',
      image: 'https://techno.pics/logo.png',
      description: 'Owns VAPOR, a very successful website and a discord with over 1.5k members'
    }
  ];

  const randBetween = (min: number, max: number) => Math.random() * (max - min) + min;
  const pickActivePose = () => {
    // rotation in [-15, 15] but avoid looking too flat near 0
    const angle = (Math.random() < 0.5 ? -1 : 1) * randBetween(4, 15);
    const lateral = (Math.random() < 0.5 ? -1 : 1) * randBetween(12, 40);
    setActiveRotation(Math.round(angle));
    setThrowX(Math.round(lateral));
    setAnimAlt((prev) => !prev);
  };

  const selectCrew = (index: number) => {
    if (index === activeCrewIndex()) {
      // Rethrow the same active card with a new pose
      pickActivePose();
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
      return;
    }
    if (!isAnimating()) {
      setIsAnimating(true);
      setLastActiveIndex(activeCrewIndex());
      setActiveCrewIndex(index);
      pickActivePose();
      // Add to played cards if not already there
      if (!playedCards().includes(index)) {
        setPlayedCards([...playedCards(), index]);
      }
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  onMount(() => {
    if (canvasRef) {
      cleanup = initFluidCursor(canvasRef, {
        transparent: true,
        shading: true,
      });
    }
    // initial active card pose
    pickActivePose();

    // Scroll listener for Discord banner
    const handleScroll = () => {
      setShowDiscordBanner(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Auto-rotate every 5 seconds
    autoRotateInterval = window.setInterval(() => {
      if (!isAnimating()) {
        const nextIndex = (activeCrewIndex() + 1) % crewMembers.length;
        setLastActiveIndex(activeCrewIndex());
        setActiveCrewIndex(nextIndex);
        pickActivePose();
        // Add to played cards if not already there
        if (!playedCards().includes(nextIndex)) {
          setPlayedCards([...playedCards(), nextIndex]);
        }
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 800);
      }
    }, 5000);

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

  onCleanup(() => {
    if (cleanup) cleanup();
    if (autoRotateInterval) clearInterval(autoRotateInterval);
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        class="fluid-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          'pointer-events': 'none',
          'z-index': 0,
        }}
      />
            <Particles />
      <div class="app">
        <div class="content">
          <div class="logo-container">
            <img src="/img/logo-gradient.svg" alt="Sail Logo" class="logo" />
          </div>
          <h1 class="title">
            Let's Set <span class="gradient-text">Sail</span>
          </h1>
          <p class="subtitle">Navigate the web with freedom</p>
        </div>
        
        <div class="features-section">
          <h2 class="features-title">
            <span class="gradient-text">Sail</span> the Seven Seas
          </h2>
          <div class="features-grid">
            <div class="feature-card" data-number="1">
              <div class="card-number">01</div>
              <div class="feature-icon">
                <i class="fa-solid fa-gamepad"></i>
              </div>
              <h3 class="feature-name">Games</h3>
              <p class="feature-description">Unblock and play your favorite games</p>
            </div>
            <div class="feature-card" data-number="2">
              <div class="card-number">02</div>
              <div class="feature-icon">
                <i class="fa-solid fa-film"></i>
              </div>
              <h3 class="feature-name">Movies</h3>
              <p class="feature-description">Stream unlimited movies anywhere</p>
            </div>
            <div class="feature-card" data-number="3">
              <div class="card-number">03</div>
              <div class="feature-icon">
                <i class="fa-solid fa-tv"></i>
              </div>
              <h3 class="feature-name">Shows</h3>
              <p class="feature-description">Watch your favorite TV series</p>
            </div>
            <div class="feature-card" data-number="4">
              <div class="card-number">04</div>
              <div class="feature-icon">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <h3 class="feature-name">Proxy</h3>
              <p class="feature-description">Browse securely and privately</p>
            </div>
            <div class="feature-card" data-number="5">
              <div class="card-number">05</div>
              <div class="feature-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <h3 class="feature-name">Chat</h3>
              <p class="feature-description">Connect with friends instantly</p>
            </div>
            <div class="feature-card" data-number="6">
              <div class="card-number">06</div>
              <div class="feature-icon">
                <i class="fa-solid fa-user-circle"></i>
              </div>
              <h3 class="feature-name">Accounts</h3>
              <p class="feature-description">Manage all your accounts easily</p>
            </div>
            <div class="feature-card" data-number="7">
              <div class="card-number">07</div>
              <div class="feature-icon">
                <i class="fa-solid fa-grip"></i>
              </div>
              <h3 class="feature-name">Apps</h3>
              <p class="feature-description">Access essential web applications</p>
            </div>
          </div>
        </div>

        <div class="crew-section">
          <h2 class="crew-title">
            Meet the <span class="gradient-text">Crew</span>
          </h2>
          
          {/* Carousel */}
          <div class="crew-carousel">
            <For each={crewMembers}>
              {(member, i) => (
                <div 
                  class={`carousel-avatar ${i() === activeCrewIndex() ? 'active' : ''} ${i() < activeCrewIndex() ? 'left' : ''} ${i() > activeCrewIndex() ? 'right' : ''}`}
                  onClick={() => selectCrew(i())}
                >
                  <img src={member.image} alt={member.name} />
                </div>
              )}
            </For>
          </div>

          {/* Card Stack */}
          <div class="crew-card-stack" data-active-card={activeCrewIndex()}>
            <For each={crewMembers}>
              {(member, i) => {
                const cardPlayOrder = () => playedCards().indexOf(i());
                const isPlayed = () => playedCards().includes(i());
                
                return (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class={`crew-card-drop ${i() === activeCrewIndex() ? 'active' : ''} ${isPlayed() ? 'played' : ''} ${(lastActiveIndex() === i() && i() !== activeCrewIndex()) ? 'last-placed' : ''}`}
                    data-card-index={i()}
                    data-play-order={cardPlayOrder()}
                    style={{
                      '--card-index': i().toString(),
                      '--play-order': cardPlayOrder().toString(),
                      '--rotation': `${(i() - activeCrewIndex()) * 3}deg`,
                      '--active-rotation': i() === activeCrewIndex() ? `${activeRotation()}deg` : '0deg',
                      '--throw-x': i() === activeCrewIndex() ? `${throwX()}px` : '0px',
                        'animation-name': i() === activeCrewIndex() ? (animAlt() ? 'cardThrowAlt' : 'cardThrow') : undefined,
                    }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    if (i() === activeCrewIndex()) {
                      card.style.setProperty('--mouse-x', `${x}px`);
                      card.style.setProperty('--mouse-y', `${y}px`);
                      card.style.transform = `translateY(0) scale(1) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${activeRotation()}deg)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.setProperty('--mouse-x', '50%');
                    card.style.setProperty('--mouse-y', '50%');
                    if (i() === activeCrewIndex()) {
                      card.style.transform = '';
                    }
                  }}
                >
                  <img src={member.image} alt={member.name} class="crew-avatar-large" />
                  <div class="crew-info">
                    <h3 class="crew-name">{member.name}</h3>
                    <p class="crew-rank">{member.rank}</p>
                    <p class="crew-link">{member.linkText}</p>
                    <p class="crew-description">{member.description}</p>
                  </div>
                </a>
              );
              }}
            </For>
          </div>
        </div>
      </div>

      {/* Discord Banner */}
      <a
        href="https://discord.gg/87CqJeQz2Z"
        target="_blank"
        rel="noopener noreferrer"
        class={`discord-banner ${showDiscordBanner() ? 'visible' : ''}`}
      >
        <i class="fa-brands fa-discord"></i>
        <span>Join Our Discord</span>
      </a>
    </>
  )
}

export default App
