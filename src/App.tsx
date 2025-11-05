import { Component, onMount, onCleanup } from 'solid-js'
import { initFluidCursor } from './lib/fluidCursor'
import Particles from './components/Particles'

const App: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let cleanup: (() => void) | undefined;

  onMount(() => {
    if (canvasRef) {
      cleanup = initFluidCursor(canvasRef, {
        transparent: true,
        shading: true,
      });
    }
  });

  onCleanup(() => {
    if (cleanup) cleanup();
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
      </div>
    </>
  )
}

export default App
