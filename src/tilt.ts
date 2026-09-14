interface TiltOptions {
  max?: number
  lift?: number
  scale?: number
}

export function initTilt(selector: string, options: TiltOptions = {}) {
  const max = options.max ?? 10
  const lift = options.lift ?? 16
  const scale = options.scale ?? 1.03

  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const rotateY = x * max * 2
      const rotateX = -y * max * 2
      el.style.transition = 'transform 0.1s ease-out'
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px) scale3d(${scale}, ${scale}, ${scale})`
    }

    const onLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
  })
}
