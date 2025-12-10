import { useState } from 'react'
import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassLink } from "./ui/GlassLink"
import { GlassButton } from "./ui/GlassButton"
import { GlassParagraph } from "./ui/GlassParagraph"
import { glassBase } from '../styles/glass'
import ProjectModal, { type Project } from './ProjectModal'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "EazyMed",
      description: "AI-powered healthcare platform for effortless specialist matching, streamlined appointment management, and powerful hospital admin controls.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&auto=format",
      technologies: ["React", "Next.js", "Prisma", "Supabase"],
      githubUrl: "https://github.com/poran-dip/eazy-doc",
      liveUrl: "https://eazydoc-jade.vercel.app",
      status: "Live"
    },
    {
      id: 2,
      title: "ODStream",
      description: "Plug-and-play GUI for real-time object detection with YOLO models. Includes remote deployment support on SBC drones like Raspberry Pi and seamless custom model integration.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&auto=format",
      technologies: ["Vite", "Flask", "OpenCV", "SocketIO", "MJPEG"],
      githubUrl: "https://github.com/poran-dip/uwod-rc",
      liveUrl: null,
      status: "Beta"
    },
    {
      id: 3,
      title: "CryoKeep",
      description: "Smart refrigeration app that dynamically adjusts fridge temperature based on stored items, extending shelf life and sending expiry notifications straight to your phone.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&auto=format",
      technologies: ["HTML", "CSS", "JS", "React Native"],
      githubUrl: "https://github.com/poran-dip/eatwise",
      liveUrl: "https://poran-dip.github.io/eatwise/",
      status: "Live"
    },
    {
      id: 4,
      title: "Journful",
      description: "Mindful social platform where users share one journal-style post a day—designed to build meaningful connections without the doomscrolling.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format",
      technologies: ["React", "Next.js", "Prisma", "Supabase"],
      githubUrl: "https://github.com/poran-dip/social",
      liveUrl: "https://journful.vercel.app/",
      status: "In Development"
    }
  ]

  return (
    <>
      <GlassCard id="projects" hoverable={false} className="scroll-mt-20">
        <GlassHeading>PROJECTS</GlassHeading>
        <GlassParagraph className="mt-6 text-lg!">Building not just projects, but experiences, innovations, and (insert trendy buzzword here)!</GlassParagraph>
        
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative overflow-hidden rounded-xl h-80 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => setSelectedProject(project)}
            >
              {/* Background Image with Low Opacity */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${project.image})`,
                  opacity: '0.25'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />
              
              {/* Glass Effect Background */}
              <div className={`absolute inset-0 ${glassBase}`} />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  project.status === 'Live' ? 'bg-green-500/30 text-green-200 border border-green-500/50' :
                  project.status === 'Beta' ? 'bg-blue-500/30 text-blue-200 border border-blue-500/50' :
                  'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50'
                }`}>
                  {project.status}
                </span>
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Title at Top */}
                <div>
                  <GlassHeading level={2} className="group-hover:text-blue-300 transition-colors mb-2">
                    {project.title}
                  </GlassHeading>

                  <GlassParagraph className="text-lg text-white/90 line-clamp-3">
                    {project.description}
                  </GlassParagraph>
                </div>
                
                {/* Bottom Content */}
                <div className="space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/80 border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/80 border border-white/20">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex gap-2">
                    <GlassButton 
                      className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      Details
                    </GlassButton>
                    <GlassButton 
                      className="flex-1 text-sm py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                    >
                      GitHub →
                    </GlassButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 text-xl">
          <GlassLink href="https://github.com/poran-dip?tab=repositories">
            View All Projects on GitHub {"→"}
          </GlassLink>
        </div>
      </GlassCard>
  
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  )
}

export default Projects
