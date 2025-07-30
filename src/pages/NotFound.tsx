import { useState, useEffect } from "react"
import { Rocket, Sparkles, Star } from "lucide-react"

const NotFound404 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rocketFloat, setRocketFloat] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    // Rocket floating animation
    const floatInterval = setInterval(() => {
      setRocketFloat(prev => (prev + 1) % 360)
    }, 50)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(floatInterval)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 p-6 relative overflow-hidden">
      
      {/* Grid background */}
      <div className="absolute inset-0 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-40" />

      {/* Mouse follower glow */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out opacity-20"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)'
        }}
      />

      {/* Floating sparkles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${(i * 7 + 10) % 90}%`,
              top: `${(i * 11 + 5) % 90}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400 opacity-60" />
          </div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-ping"
            style={{
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 17 + 10) % 95}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 4)}s`
            }}
          >
            <Star className="w-2 h-2 text-blue-300 opacity-50" fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Main content card */}
      <div className="relative z-10 p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center gap-4">
        
        {/* Floating rocket with orbit effect */}
        <div className="relative w-24 h-24 mb-4">
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${rocketFloat}deg) translateY(${Math.sin(rocketFloat * 0.05) * 8}px)`
            }}
          >
            <Rocket className="w-20 h-20 text-purple-400 animate-pulse" />
          </div>
          
          {/* Rocket trail sparkles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={`trail-${i}`}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"
                style={{
                  left: `${45 + Math.cos((rocketFloat - i * 20) * 0.017) * 15}%`,
                  top: `${45 + Math.sin((rocketFloat - i * 20) * 0.017) * 15}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Glowing 404 with enhanced effects */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
          4
          <span className="inline-block animate-bounce mx-2 relative">
            0
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            </div>
          </span>
          4
          
          {/* Glow effect behind text */}
          <div className="absolute inset-0 text-5xl font-extrabold text-purple-500 blur-lg opacity-30 -z-10">
            404
          </div>
        </h1>

        {/* Subtitle with space theme */}
        <p className="text-lg text-gray-400 font-medium">
          <span className="text-purple-400">HOUSTON, WE HAVE A PROBLEM</span>
        </p>
      </div>

      {/* Enhanced description */}
      <div className="relative z-10 mt-10 space-y-4  flex flex-col items-center text-center">
        <p className="text-xl max-w-lg leading-relaxed">
          Looks like this page took an unexpected detour through a{" "}
          <span className="text-purple-400 font-semibold">cosmic wormhole</span>! 🌌
        </p>
        
        <p className="text-lg text-gray-400 max-w-md">
          Don't worry, our space engineers are working on adding more routes to explore.
        </p>
      </div>

      {/* Enhanced button with space effects */}
      <button 
        onClick={() => window.location.href = '/'}
        className="relative z-10 mt-8 px-8 py-4 rounded-full 
                   bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold 
                   shadow-lg hover:shadow-2xl hover:shadow-purple-500/25
                   transform hover:-translate-y-2 hover:scale-105
                   transition-all duration-300 group overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          🚀 Launch Back Home
          <Sparkles className="w-4 h-4 group-hover:animate-spin transition-all duration-300" />
        </span>
        
        {/* Button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
        
        {/* Shooting star effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>

      {/* Fun space facts footer */}
      <div className="relative z-10 mt-8 text-sm text-gray-500 max-w-md">
        <p>🛸 Fun fact: There are over 100 billion galaxies in the observable universe!</p>
      </div>

      {/* Custom CSS for additional animations */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}

export default NotFound404
