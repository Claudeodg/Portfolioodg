interface Star {
  x: number
  y: number
  r: number
  speed: number
  phase: number
  driftX: number
  driftY: number
}

interface Shooter {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

export function initStarfield(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  let width = 0
  let height = 0
  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  let stars: Star[] = []
  let shooters: Shooter[] = []
  let nextShooterAt = 0
  let t = 0

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.round((width * height) / 8000)
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.02 + 0.006,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.04,
      driftY: (Math.random() - 0.5) * 0.02 + 0.01,
    }))
  }

  function maybeSpawnShooter() {
    if (!isDarkTheme()) return
    if (t < nextShooterAt) return
    nextShooterAt = t + 260 + Math.random() * 400
    const fromLeft = Math.random() < 0.5
    shooters.push({
      x: fromLeft ? -20 : width + 20,
      y: Math.random() * height * 0.5,
      vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 4),
      vy: 2.5 + Math.random() * 2,
      life: 0,
      maxLife: 40 + Math.random() * 10,
    })
  }

  function frame() {
    t += 1
    ctx.clearRect(0, 0, width, height)
    const dark = isDarkTheme()
    const rgb = dark ? '255,255,255' : '107,99,117'
    const baseAlpha = dark ? 1 : 0.12

    for (const s of stars) {
      s.x += s.driftX
      s.y += s.driftY
      if (s.x < 0) s.x = width
      if (s.x > width) s.x = 0
      if (s.y > height) {
        s.y = 0
        s.x = Math.random() * width
      }
      const twinkle = (Math.sin(t * s.speed + s.phase) + 1) / 2
      ctx.beginPath()
      ctx.fillStyle = `rgba(${rgb}, ${(0.15 + twinkle * 0.85) * baseAlpha})`
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }

    maybeSpawnShooter()
    shooters = shooters.filter((sh) => sh.life < sh.maxLife)
    for (const sh of shooters) {
      sh.life += 1
      sh.x += sh.vx
      sh.y += sh.vy
      const progress = sh.life / sh.maxLife
      const alpha = Math.sin(progress * Math.PI)
      const tailX = sh.x - sh.vx * 5
      const tailY = sh.y - sh.vy * 5
      const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY)
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(sh.x, sh.y)
      ctx.lineTo(tailX, tailY)
      ctx.stroke()
    }

    requestAnimationFrame(frame)
  }

  resize()
  window.addEventListener('resize', resize)
  requestAnimationFrame(frame)
}
