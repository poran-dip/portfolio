import { useState, useEffect, type ReactNode } from 'react';
import { ChevronDown, Github, Linkedin, Twitter, Mail, ExternalLink, Music, Code, Gamepad2, Palette, Sun, Moon, Menu, X, Calendar, Heart } from 'lucide-react';

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                 hover:bg-white/20 transition-all duration-300 group"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

interface FloatingElementProps {
  children?: ReactNode
  delay?: number
}

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => (
  <div 
    className="animate-float"
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

interface GradientTextProps {
  children?: ReactNode
  className?: string
}

// Gradient Text Component
const GradientText = ({ children, className = "" }: GradientTextProps) => (
  <span className={`bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

interface GlassCardProps {
  children?: ReactNode
  className?: string
  hover?: boolean
}

// Glass Card Component
const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => (
  <div className={`
    backdrop-blur-xl bg-white/10 dark:bg-black/20 
    border border-white/20 dark:border-white/10 
    rounded-3xl shadow-2xl 
    ${hover ? 'hover:bg-white/20 dark:hover:bg-black/30 hover:shadow-3xl hover:-translate-y-1' : ''}
    transition-all duration-500 ${className}
  `}>
    {children}
  </div>
);

interface NavbarProps {
  activeSection?: string
}

// Navigation Component
const Navbar = ({ activeSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { href: "#about", label: "ABOUT" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#music", label: "MUSIC" },
    { href: "#contact", label: "CONTACT" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <GlassCard className="mx-auto max-w-6xl" hover={false}>
        <div className="flex items-center justify-between p-4">
          <GradientText className="text-2xl font-bold cursor-default select-none">
            Poran Dip
          </GradientText>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-all duration-300 relative
                  ${activeSection === item.href.slice(1) 
                    ? 'text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-400'
                  }
                  after:content-[''] after:absolute after:w-0 after:h-0.5 
                  after:bg-gradient-to-r after:from-blue-400 after:to-purple-500
                  after:left-0 after:-bottom-1 after:transition-all after:duration-300
                  hover:after:w-full
                `}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/20 p-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </GlassCard>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(59, 130, 246, 0.15), 
                      rgba(147, 51, 234, 0.15), 
                      transparent 70%)`
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <GlassCard className="p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Image */}
            <FloatingElement>
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                  <img 
                    src="/profile.png" 
                    alt="Poran Dip" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse" />
              </div>
            </FloatingElement>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                  <GradientText>Poran Dip</GradientText>
                </h1>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Code className="w-5 h-5" />
                    <span>Developer</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="flex items-center gap-2 text-purple-400">
                    <Music className="w-5 h-5" />
                    <span>Producer</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="flex items-center gap-2 text-pink-400">
                    <Gamepad2 className="w-5 h-5" />
                    <span>Creator</span>
                  </div>
                </div>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  CS Student crafting pixel-perfect web experiences and immersive soundscapes. 
                  Where code meets creativity, and dreams become digital reality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                           text-white rounded-full font-semibold shadow-lg hover:shadow-xl 
                           transform hover:-translate-y-1 transition-all duration-300
                           flex items-center gap-2 justify-center"
                >
                  <span>Explore Projects</span>
                  <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
                
                <a
                  href="#contact"
                  className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-full 
                           font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300
                           flex items-center gap-2 justify-center backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                {[
                  { icon: Github, href: "https://github.com/poran-dip", color: "hover:text-gray-600" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/poran-dip/", color: "hover:text-blue-600" },
                  { icon: Twitter, href: "https://www.twitter.com/", color: "hover:text-blue-400" }
                ].map(({ icon: Icon, href, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                              text-gray-600 dark:text-gray-300 ${color} 
                              transform hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="flex justify-center mt-12">
          <ChevronDown className="w-8 h-8 text-blue-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript"], color: "from-blue-400 to-cyan-400" },
    { category: "Backend", items: ["Node.js", "Supabase", "REST APIs", "Database Design"], color: "from-green-400 to-emerald-400" },
    { category: "Music", items: ["EDM Production", "Mixing & Mastering", "Sound Design", "Audio Engineering"], color: "from-purple-400 to-pink-400" },
    { category: "Tools", items: ["Unity", "Git", "Figma", "FL Studio"], color: "from-orange-400 to-red-400" }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>About Me</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate about creating digital experiences that bridge the gap between technology and artistry
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">My Journey</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I'm a Computer Science student with an insatiable curiosity for both code and creativity. 
                My journey began with a simple "Hello, World!" and evolved into crafting complex web applications 
                and producing electronic music that moves souls.
              </p>
              <p>
                When I'm not debugging code or fine-tuning bass drops, you'll find me exploring the latest 
                in AI/ML, diving into game development, or planning my next anime binge-watch session.
              </p>
              <p>
                I believe in the power of technology to create meaningful connections and experiences that 
                last beyond the screen.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">Fun Facts</h3>
            <div className="space-y-4">
              {[
                { icon: Heart, text: "Proud Radish Enjoyer (Nahida supremacy!)", link: "https://youtu.be/7zkCp_kVtj4" },
                { icon: Music, text: "50+ EDM tracks produced (150+ in the vault)" },
                { icon: Calendar, text: "Anime watchlist longer than my code files" },
                { icon: Gamepad2, text: "Genshin Impact enthusiast (AR 60+)" }
              ].map(({ icon: Icon, text, link }, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, i) => (
            <FloatingElement key={skillGroup.category} delay={i * 0.2}>
              <GlassCard className="p-6 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skillGroup.color} flex items-center justify-center mb-4`}>
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">{skillGroup.category}</h4>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, j) => (
                    <div key={j} className="text-sm text-gray-600 dark:text-gray-300 
                                          px-3 py-1 rounded-full bg-white/20 dark:bg-black/20">
                      {skill}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FloatingElement>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: "Eazydoc",
      description: "Streamlined document management system with AI-powered features",
      tech: ["React", "Node.js", "AI/ML"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Underwater Object Detection",
      description: "Computer vision project for marine life identification",
      tech: ["Python", "TensorFlow", "OpenCV"],
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Eatwise",
      description: "Smart nutrition tracking app with personalized recommendations",
      tech: ["React Native", "Firebase", "ML"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "DailyJournal",
      description: "Minimalist journaling app with mood tracking and insights",
      tech: ["Vue.js", "Supabase", "Chart.js"],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>Featured Projects</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my latest work, where innovation meets implementation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <FloatingElement key={project.title} delay={i * 0.1}>
              <GlassCard className="p-8 group cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6 
                               group-hover:scale-110 transition-transform duration-300`}>
                  <Code className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1 text-sm bg-white/20 dark:bg-black/20 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-blue-400 group-hover:text-blue-500 transition-colors">
                  <span className="mr-2">View Project</span>
                  <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </GlassCard>
            </FloatingElement>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'tech',
    subcategory: 'web',
    title: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const categories: Record<string, { value: string; label: string }[]> = {
    tech: [
      { value: "web", label: "Web Development" },
      { value: "game", label: "Game Development" },
      { value: "ai", label: "AI/ML Project" }
    ],
    music: [
      { value: "production", label: "Music Production" },
      { value: "mixing", label: "Mixing & Mastering" },
      { value: "collaboration", label: "Collaboration" }
    ]
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle form submission logic here
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: categories[value][0].value })
    }));
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>Let's Create Together</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to bring your ideas to life? Let's start a conversation.
          </p>
        </div>

        <GlassCard className="p-8 md:p-12">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className="w-full p-4 rounded-xl bg-white/20 dark:bg-black/20 border border-white/30 
                             focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 rounded-xl bg-white/20 dark:bg-black/20 border border-white/30 
                             focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl bg-white/20 dark:bg-black/20 border border-white/30 
                             focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm"
                  >
                    <option value="tech">Technology</option>
                    <option value="music">Music</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subcategory" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Service
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl bg-white/20 dark:bg-black/20 border border-white/30 
                             focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm"
                  >
                    {categories[formData.category].map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Project Title *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-xl bg-white/20 dark:bg-black/20 border border-white/30 
                           focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm"
                  placeholder="What's your project about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full p-4 rounded-xl bg-white/20 dark:bg-black/20 border border-white/30 
                           focus:border-blue-400 focus:outline-none transition-colors backdrop-blur-sm resize-none"
                  placeholder="Tell me more about your project, timeline, and any specific requirements..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl 
                                border-2 border-dashed border-blue-400 text-blue-400 
                                hover:bg-blue-400/10 transition-colors cursor-pointer">
                  <input type="file" className="hidden" />
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Attach Files (Optional)
                  </span>
                </label>

                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                           text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
                           transform hover:-translate-y-1 transition-all duration-300
                           flex items-center gap-2 justify-center"
                >
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full 
                            flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thanks for reaching out! I'll get back to you within 48 hours. 
                Can't wait to discuss your project!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 text-blue-400 border border-blue-400 rounded-xl 
                         hover:bg-blue-400 hover:text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          )}
        </GlassCard>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            Newsletter coming soon! Stay tuned for updates on my latest projects and music releases.
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden pt-24 pb-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 overflow-hidden">
        {/* big animated gradient blob */}
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-3xl animate-pulse" />
        {/* smaller accent blob */}
        <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-400 opacity-20 blur-2xl animate-[ping_8s_linear_infinite]" />
        {/* moving grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] animate-[moveGrid_30s_linear_infinite]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-12">
        
        {/* --- Floating Social Glass Panel --- */}
        <FloatingElement delay={0.1}>
          <GlassCard className="flex gap-8 px-10 py-6 group">
            {[
              { icon: Github, href: "https://github.com/poran-dip" },
              { icon: Linkedin, href: "https://linkedin.com/in/poran-dip" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Mail, href: "mailto:porandip.work@gmail.com" }
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/20 dark:bg-black/30 border border-white/10 backdrop-blur-md
                           transition-all duration-500 hover:scale-125 hover:bg-gradient-to-r 
                           hover:from-blue-400 hover:to-purple-500 hover:text-white"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </GlassCard>
        </FloatingElement>

        {/* --- Logo / Branding Animation --- */}
        <FloatingElement delay={0.3}>
          <GradientText className="text-4xl md:text-5xl font-extrabold tracking-tight animate-[textGlow_3s_ease-in-out_infinite]">
            PORAN.DIP
          </GradientText>
        </FloatingElement>

        {/* --- Tagline with microinteraction --- */}
        <FloatingElement delay={0.5}>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg max-w-2xl">
            Turning hums into <span className="hover:text-blue-400 transition-colors">bangers</span>,  
            pixels into <span className="hover:text-purple-400 transition-colors">experiences</span>,  
            and ideas into <span className="hover:text-pink-400 transition-colors">innovations</span>.
          </p>
        </FloatingElement>

        {/* --- Divider --- */}
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

        {/* --- Bottom Line --- */}
        <FloatingElement delay={0.7}>
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            © {new Date().getFullYear()} Poran Dip — <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" /> shipping pixels worldwide
          </p>
        </FloatingElement>
      </div>

      {/* --- Bottom Gradient Accent --- */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 blur-sm opacity-70" />
    </footer>
  );
};

const ClaudePage = () => {
  return (
    <div className='bg-white dark:bg-zinc-800'>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default ClaudePage