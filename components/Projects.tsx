import { projects } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const featured = projects.filter(p => p.featured)
  const rest     = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 bg-lavender-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-16 text-center">Projects</h2>

        {/* Featured spotlight */}
        <div className="bg-indigo-deep rounded-2xl p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(p => (
              <ProjectCard key={p.id} project={p} variant="featured" />
            ))}
          </div>
        </div>

        {/* More projects */}
        <h3 className="text-lg font-semibold text-indigo-800 mb-6">More Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map(p => (
            <ProjectCard key={p.id} project={p} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}
