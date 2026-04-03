import React from 'react'
import { Film } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-black">
      <div className="relative group">
        <div className="absolute -inset-4 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-[2rem] bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center animate-[bounce_2s_infinite]">
          <Film className="w-10 h-10 text-black fill-black/20" />
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] animate-pulse">
            Explorer Loading
        </h2>
        <div className="mt-4 flex gap-1 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80 animate-[bounce_1.4s_infinite_0.1s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 animate-[bounce_1.4s_infinite_0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 animate-[bounce_1.4s_infinite_0.3s]" />
        </div>
      </div>

      <div className="fixed bottom-12 left-0 right-0 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-8 opacity-20">
            <div className="h-0.5 flex-grow bg-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white whitespace-nowrap">Setting the stage</span>
            <div className="h-0.5 flex-grow bg-white" />
        </div>
      </div>
    </div>
  )
}
