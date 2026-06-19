import { skills, type SkillCategory } from '@/lib/data'
import SkillCard from '@/components/ui/SkillCard'

const CATEGORIES: SkillCategory[] = ['Languages', 'Frameworks', 'Tools', 'Cloud']

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-indigo-deep">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">Tech Stack</h2>

        <div className="space-y-12">
          {CATEGORIES.map(category => {
            const categorySkills = skills.filter(s => s.category === category)
            if (categorySkills.length === 0) return null
            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {categorySkills.map(skill => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
