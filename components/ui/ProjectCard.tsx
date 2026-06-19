import type { Project } from '@/lib/data'

type Props = { project: Project; variant: 'featured' | 'compact' }

export default function ProjectCard({ project, variant }: Props) {
  if (variant === 'featured') {
    return (
      <div className="bg-indigo-deep/60 border border-violet-700 rounded-2xl overflow-hidden hover:border-pink-500 transition-colors duration-200">
        <div className="h-44 bg-gradient-to-br from-violet-900 to-pink-900 flex items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-widest">Preview</span>
        </div>
        <div className="p-6">
          <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map(t => (
              <span key={t} className="px-2 py-1 rounded-full bg-violet-900/60 text-violet-300 text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-white underline underline-offset-2">
                GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="text-sm text-pink-400 hover:text-pink-300 underline underline-offset-2">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-violet-200 rounded-xl p-5 hover:border-violet-400 hover:shadow-md transition-all duration-200">
      <h3 className="text-indigo-900 font-bold mb-1">{project.title}</h3>
      <p className="text-slate-500 text-sm mb-3 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-indigo-700 underline underline-offset-2">
            GitHub
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="text-xs text-pink-500 hover:text-pink-700 underline underline-offset-2">
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}
