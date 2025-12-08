'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Copy, Check, Github } from 'lucide-react';
import { useRef, useState } from 'react';
import Avatar3D from '@/components/ui/Avatar3D';

export default function Hero() {
  const ref = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("hi@selora.dev");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="hero" ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background z-0" />
      <Avatar3D />
      
      {/* 3D Entrance Text */}
      <motion.div 
        className="z-10 text-center flex flex-col items-center gap-6 mix-blend-difference"
        style={{ y, opacity }}
        initial={{ scale: 3, opacity: 0, filter: 'blur(20px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // smooth bezier
      >
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white font-lexend">
          SELORA
        </h1>
        <div className="w-24 h-1 bg-accent rounded-full mb-4" />
        <h2 className="text-xl md:text-3xl font-light text-gray-300 tracking-widest uppercase font-lexend">
          MIHÁLY GYŐRI
        </h2>

        {/* Recruiter Pack */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 0.8 }}
           className="mt-8 flex flex-col items-center gap-6"
        >
             {/* Status Badge */}
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                 </span>
                 <span className="text-sm font-medium text-gray-300">Available for Work</span>
             </div>

             {/* Actions */}
             <div className="flex flex-wrap items-center justify-center gap-4">
                 <a 
                    href="/resume.pdf" 
                    download
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                 >
                     <Download size={18} /> Resume
                 </a>
                 <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-sm"
                 >
                     {isCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                     {isCopied ? "Copied!" : "Copy Email"}
                 </button>
             </div>

             {/* Socials (Mini) */}
             <div className="flex items-center gap-6 text-gray-400">
                 <a href="https://github.com/Misiix9" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                     <Github size={24} />
                 </a>
             </div>
        </motion.div>

      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 z-20 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
