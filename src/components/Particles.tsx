import { Component, For } from 'solid-js'

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const Particles: Component = () => {
  // Generate 40 particles with random properties
  const particles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2, // 2-6px
    duration: Math.random() * 10 + 15, // 15-25s
    delay: Math.random() * 5, // 0-5s delay
    opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8 opacity
  }));

  return (
    <div class="particles-container">
      <For each={particles}>
        {(particle) => (
          <div
            class="particle"
            style={{
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              'animation-duration': `${particle.duration}s`,
              'animation-delay': `${particle.delay}s`,
              opacity: particle.opacity,
            }}
          />
        )}
      </For>
    </div>
  )
}

export default Particles
