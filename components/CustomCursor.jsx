import React, { useEffect, useRef } from 'react'

/**
 * Matches the interactive elements already used across the site (Link/Button
 * render as <a>/<button>, cards are wrapped in <Link>) so no other component
 * needs to be touched for hover states to work.
 */
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, ' +
  '[role="button"], [tabindex]:not([tabindex="-1"]), [class*="cursor-pointer"]'

const EASE = 0.18
const MAGNET_STRENGTH = 0.25

const CustomCursor = () => {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isFinePointer =
      typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Touch/coarse-pointer devices and reduced-motion users keep the native cursor.
    if (!isFinePointer || prefersReducedMotion) return

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return

    const html = document.documentElement
    html.classList.add('custom-cursor-active')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }
    let dotScale = 1
    let ringScale = 1
    let isHovering = false
    let isPressed = false
    let hoverRect = null
    let rafId

    const setVisible = (visible) => {
      root.style.opacity = visible ? '1' : '0'
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setVisible(true)
    }

    const handleWindowMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) setVisible(false)
    }

    const findInteractive = (target) =>
      target && target.closest ? target.closest(INTERACTIVE_SELECTOR) : null

    const handleMouseOver = (e) => {
      const el = findInteractive(e.target)
      if (!el) return
      isHovering = true
      hoverRect = el.getBoundingClientRect()
      ring.classList.add('is-hovering')
    }

    const handleMouseOut = (e) => {
      const el = findInteractive(e.target)
      if (!el) return
      // Only clear if we're not moving into a nested interactive descendant.
      if (e.relatedTarget && el.contains(e.relatedTarget)) return
      isHovering = false
      hoverRect = null
      ring.classList.remove('is-hovering')
    }

    const handleMouseDown = () => {
      isPressed = true
    }
    const handleMouseUp = () => {
      isPressed = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseout', handleWindowMouseOut, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, true)
    document.addEventListener('mouseout', handleMouseOut, true)
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })

    const loop = () => {
      // The dot tracks the raw pointer precisely; only a subtle magnetic pull
      // (toward whatever it's hovering) nudges its target, never the layout.
      let targetX = mouse.x
      let targetY = mouse.y
      if (hoverRect) {
        const cx = hoverRect.left + hoverRect.width / 2
        const cy = hoverRect.top + hoverRect.height / 2
        targetX = mouse.x + (cx - mouse.x) * MAGNET_STRENGTH
        targetY = mouse.y + (cy - mouse.y) * MAGNET_STRENGTH
      }

      const targetDotScale = isHovering ? 0.4 : isPressed ? 0.8 : 1
      const targetRingScale = isHovering ? 1.9 : isPressed ? 0.85 : 1

      dotScale += (targetDotScale - dotScale) * EASE
      ringScale += (targetRingScale - ringScale) * EASE
      ringPos.x += (targetX - ringPos.x) * EASE
      ringPos.y += (targetY - ringPos.y) * EASE

      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${dotScale})`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringScale})`

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleWindowMouseOut)
      document.removeEventListener('mouseover', handleMouseOver, true)
      document.removeEventListener('mouseout', handleMouseOut, true)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      html.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <div ref={rootRef} aria-hidden="true" className="cc-root">
      <div ref={dotRef} className="cc-dot" />
      <div ref={ringRef} className="cc-ring" />
    </div>
  )
}

export default CustomCursor
