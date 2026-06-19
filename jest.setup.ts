import '@testing-library/jest-dom'

// IntersectionObserver is not available in jsdom
global.IntersectionObserver = class IntersectionObserver {
  root = null
  rootMargin = ''
  thresholds = []
  constructor(_cb: IntersectionObserverCallback, _opts?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
}
