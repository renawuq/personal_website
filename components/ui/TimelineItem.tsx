import type { Experience } from '@/lib/data'

type Props = { entry: Experience; isLast: boolean }

export default function TimelineItem({ entry, isLast }: Props) {
  return (
    <div className="relative pl-8">
      {!isLast && (
        <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-violet-800" />
      )}
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-violet-600 ring-2 ring-pink-500 ring-offset-2 ring-offset-indigo-deep" />

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">{entry.company}</h3>
            <p className="text-violet-300 font-medium">{entry.role}</p>
          </div>
          <span className="text-pink-400 text-sm font-medium whitespace-nowrap">
            {entry.start} — {entry.end}
          </span>
        </div>
        <ul className="space-y-2">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
              <span className="text-violet-500 mt-1 flex-shrink-0">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
