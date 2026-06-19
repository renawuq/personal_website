import { personalInfo } from '@/lib/data'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-indigo-deep overflow-hidden">
      {/* Animated gradient orbs */}
      <div
        className="orb absolute w-96 h-96 rounded-full opacity-30 blur-3xl bg-violet-600 -top-20 -left-20"
        style={{ '--drift-duration': '10s', '--drift-delay': '0s' } as React.CSSProperties}
      />
      <div
        className="orb absolute w-72 h-72 rounded-full opacity-20 blur-3xl bg-pink-500 bottom-20 right-10"
        style={{ '--drift-duration': '13s', '--drift-delay': '-4s' } as React.CSSProperties}
      />
      <div
        className="orb absolute w-64 h-64 rounded-full opacity-15 blur-3xl bg-violet-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ '--drift-duration': '9s', '--drift-delay': '-7s' } as React.CSSProperties}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight mb-6 leading-none">
          {personalInfo.name}
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {personalInfo.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-semibold text-sm tracking-wide transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 rounded-full border border-violet-400 text-violet-300 hover:bg-violet-900/40 font-semibold text-sm tracking-wide transition-colors duration-200"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}
