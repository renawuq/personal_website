import { personalInfo } from '@/lib/data'

export default function About() {
  const initials = personalInfo.name.split(' ').map(n => n[0]).join('')

  return (
    <section id="about" className="py-24 bg-lavender-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-16 text-center">About Me</h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar — replace gradient with <img src="/headshot.jpg"> when ready */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-2xl ring-4 ring-violet-300 shadow-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
              <span className="text-white text-6xl font-bold select-none">{initials}</span>
            </div>
          </div>

          <div>
            <div className="space-y-4 mb-10">
              {personalInfo.about.map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">{para}</p>
              ))}
            </div>

            <div className="flex gap-8">
              {personalInfo.stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-violet-700">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
