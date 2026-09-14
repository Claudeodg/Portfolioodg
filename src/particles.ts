import { tsParticles, type Container } from '@tsparticles/engine'
import { loadLinksPreset } from '@tsparticles/preset-links'

let presetLoaded: Promise<void> | null = null
let container: Container | undefined

function currentColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark'
  return {
    color: dark ? '#f2c94c' : '#b45309',
    particleOpacity: dark ? 0.6 : 0.35,
    linkOpacity: dark ? 0.3 : 0.15,
  }
}

async function build() {
  const { color, particleOpacity, linkOpacity } = currentColors()

  container = await tsParticles.load({
    id: 'tsparticles',
    options: {
      preset: 'links',
      fullScreen: { enable: false },
      fpsLimit: 60,
      background: { color: 'transparent' },
      particles: {
        number: { value: 70, density: { enable: true, width: 1200, height: 800 } },
        color: { value: color },
        opacity: { value: particleOpacity },
        size: { value: { min: 1, max: 2.5 } },
        links: { color, opacity: linkOpacity, distance: 140, width: 1 },
        move: { enable: true, speed: 0.4 },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: { enable: true },
        },
      },
    },
  })
}

export async function initParticles() {
  if (!presetLoaded) {
    presetLoaded = loadLinksPreset(tsParticles).then(() => build())
  }
  return presetLoaded
}

export async function refreshParticlesTheme() {
  if (!container) return
  container.destroy()
  await build()
}
