import { experience } from '@/lib/data'
import TimelineItem from '@/components/ui/TimelineItem'

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-indigo-deep">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">Experience</h2>

        <div>
          {experience.map((entry, i) => (
            <TimelineItem
              key={`${entry.company}-${entry.start}`}
              entry={entry}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
