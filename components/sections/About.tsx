'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Download, Languages, Database, Layout, Server, Cpu, Code, Palette, Terminal, Globe } from 'lucide-react';

export default function About() {
  const t = useTranslations('Home');

  // Extended Tech Stack Data
  const techStack = [
    { category: "Frontend", items: [
        { name: "Next.js", icon: <Layout className="w-4 h-4" />, color: "text-blue-400 bg-blue-500/10" },
        { name: "React", icon: <Code className="w-4 h-4" />, color: "text-cyan-400 bg-cyan-500/10" },
        { name: "Tailwind", icon: <Palette className="w-4 h-4" />, color: "text-sky-400 bg-sky-500/10" },
        { name: "Framer", icon: <Layout className="w-4 h-4" />, color: "text-purple-400 bg-purple-500/10" },
    ]},
    { category: "Backend", items: [
        { name: "Node.js", icon: <Server className="w-4 h-4" />, color: "text-green-400 bg-green-500/10" },
        { name: "PostgreSQL", icon: <Database className="w-4 h-4" />, color: "text-indigo-400 bg-indigo-500/10" },
        { name: "Firebase", icon: <Database className="w-4 h-4" />, color: "text-yellow-400 bg-yellow-500/10" },
    ]},
    { category: "Tools", items: [
        { name: "TypeScript", icon: <Code className="w-4 h-4" />, color: "text-blue-500 bg-blue-600/10" },
        { name: "Git", icon: <Terminal className="w-4 h-4" />, color: "text-orange-400 bg-orange-500/10" },
        { name: "Figma", icon: <Palette className="w-4 h-4" />, color: "text-pink-400 bg-pink-500/10" },
    ]}
  ];

  return (
    <section id="about" className="py-24 container mx-auto px-6 max-w-5xl">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Profile Photo (1 Col) */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="md:col-span-1 relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-0 group border border-white/5"
          >
              <Image 
                 src="/images/image.jpg"
                 alt="Profile"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                 sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-white/80 backdrop-blur-md bg-black/30 px-2 py-1 rounded-full border border-white/10">
                          Available for work
                      </span>
                  </div>
                  <div className="flex gap-3">
                      <a href="#" className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                          <Linkedin className="w-4 h-4" />
                      </a>
                       <a href="https://github.com/Misiix9" target="_blank" className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                          <Github className="w-4 h-4" />
                      </a>
                       <a href="mailto:hi@selora.dev" className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                          <Mail className="w-4 h-4" />
                      </a>
                  </div>
              </div>
          </motion.div>

          {/* 2. Bio & Stats (2 Cols) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="md:col-span-2 bg-[#111] border border-white/5 p-6 rounded-3xl flex flex-col justify-between gap-6 group hover:border-white/10 transition-colors"
            >
              <div>
                   <div className="flex justify-between items-start mb-2">
                       <p className="text-gray-400 text-sm font-mono tracking-wide">About Me</p>
                       <span className="text-xs text-gray-600 font-mono">EST. 2023</span>
                   </div>
                   <h3 className="text-3xl font-bold text-white leading-tight mb-3">
                       I build pixels with <span className="text-accent">purpose</span>.
                   </h3>
                   <p className="text-gray-400 text-sm leading-relaxed text-balance">
                       I'm Mihály, a Full Stack Engineer who bridges the gap between design and engineering. I don't just write code; I craft digital experiences that are fast, accessible, and visually stunning. My focus is on React ecosystems and high-performance animations.
                   </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <h4 className="text-2xl font-bold text-white">2+</h4>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Years Exp</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <h4 className="text-2xl font-bold text-white">15+</h4>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Projects</p>
                  </div>
                   <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <h4 className="text-2xl font-bold text-white">100%</h4>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Committed</p>
                  </div>
              </div>
          </motion.div>

          {/* 3. Location & Connect (1 Col) - Moved UP */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="md:col-span-1 bg-[#111] border border-white/5 p-6 rounded-3xl flex flex-col justify-between gap-4 group hover:border-white/10 transition-colors"
           >
               <div className="flex items-start justify-between">
                   <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            <h4 className="text-white font-bold text-sm">Budapest</h4>
                        </div>
                        <p className="text-gray-500 text-xs pl-6">Based in Hungary</p>
                   </div>
                   <div className="p-2 rounded-lg bg-white/5 text-xs text-gray-400 font-mono">
                        GMT+2
                   </div>
               </div>

                <div className="h-px w-full bg-white/5" />
                
               <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Language</span>
                        <span className="text-white">EN / HU</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Relocation</span>
                        <span className="text-white">Available</span>
                    </div>
               </div>

               <div className="mt-auto pt-4">
                   <a 
                     href="/cv.pdf" 
                     className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-colors"
                   >
                       <Download className="w-4 h-4" />
                       Download CV
                   </a>
               </div>
           </motion.div>

          {/* 4. Extended Tech Stack (2 Cols) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="md:col-span-2 bg-[#111] border border-white/5 p-6 rounded-3xl flex flex-col gap-4 group hover:border-white/10 transition-colors"
          >
              <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tech Arsenal</h4>
                  <Code className="w-4 h-4 text-gray-600" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {techStack.map((group, i) => (
                      <div key={i} className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500 mb-2 pl-1">{group.category}</p>
                          <div className="flex flex-col gap-2">
                              {group.items.map((tech, j) => (
                                  <div key={j} className={`flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default`}>
                                      {tech.icon}
                                      <span className={`text-xs font-medium ${tech.color.split(" ")[0]}`}>{tech.name}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </motion.div>

       </div>
    </section>
  );
}
