import { GlassButton } from "./ui/GlassButton"
import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassLink } from "./ui/GlassLink"
import { GlassParagraph } from "./ui/GlassParagraph"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  status: string
}

interface ProjectModalProps {
    project: Project | null
    onClose: () => void
  }

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center h-screen">
      <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute -top-2 right-2 text-shadow-lg text-white/70 hover:text-white text-4xl z-10"
          >
            ×
          </button>
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <GlassHeading className="text-2xl mb-4">{project.title}</GlassHeading>
          <GlassParagraph className="text-base mb-6">
            {project.description}
          </GlassParagraph>
          
          <div className="mb-6">
            <h4 className="text-white/90 font-semibold mb-3">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <GlassLink href={project.githubUrl} className="pb-2 flex-1 text-center">
              View on GitHub
            </GlassLink>
            {project.liveUrl && (
              <GlassLink className="flex-1 w-full" href={project.liveUrl}>
                <GlassButton className="w-full">
                  Visit Live Site
                </GlassButton>
              </GlassLink>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

export default ProjectModal
