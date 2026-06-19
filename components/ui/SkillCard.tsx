import type { Skill } from '@/lib/data'

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center justify-center p-4 rounded-xl border border-violet-700 hover:border-pink-500 hover:shadow-[0_0_12px_rgba(236,72,153,0.35)] transition-all duration-200 cursor-default">
      <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
    </div>
  )
}
