import { Link } from "react-router";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 p-6 relative overflow-hidden">
      <div className="absolute inset-0 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-[size:40px_40px] opacity-40" />

      <div className="relative z-10 p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col items-center gap-4">
        <Ghost className="w-20 h-20 text-purple-400 animate-pulse" />
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>
      </div>

      <p className="relative z-10 mt-10 text-xl max-w-lg">
        Ah, but a portfolio can only have so much content. <br />
        We’ll add that route in the next project!
      </p>

      <Link 
        to="/" 
        className="relative z-10 mt-8 px-6 py-3 rounded-full 
                   bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold 
                   shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                   transition-all duration-300"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
