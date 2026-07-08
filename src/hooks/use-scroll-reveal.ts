import * as React from "react"

// Simple scroll-reveal hook using IntersectionObserver.
// Adds a `revealed` CSS class to matching elements when they enter viewport.
export function useScrollReveal(selector = "[data-reveal]", threshold = 0.12) {
  React.useEffect(() => {
    if (typeof window === "undefined" || !('IntersectionObserver' in window)) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add("in-view", "revealed")
            obs.unobserve(el)
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, threshold])
}

export default useScrollReveal
