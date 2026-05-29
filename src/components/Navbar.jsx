import { motion } from "framer-motion";
import { Shield, Wifi, Bell, Activity } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[2000] flex items-center justify-between px-6 py-3"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,255,0.15)"
      }}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Shield className="text-cyan-400 w-8 h-8" />
          <div className="absolute inset-0 blur-md bg-cyan-400 opacity-30 rounded-full" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-widest text-white">
            GEO<span className="text-cyan-400">SHIELD</span>
          </h1>
          <p className="text-xs text-gray-400 tracking-widest">NEPAL DISASTER INTELLIGENCE</p>
        </div>
      </div>

      {/* STATUS INDICATORS */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-mono">SYSTEM ONLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="text-cyan-400 w-4 h-4" />
          <span className="text-cyan-400 text-xs font-mono">LIVE DATA</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="text-purple-400 w-4 h-4" />
          <span className="text-purple-400 text-xs font-mono">AI ACTIVE</span>
        </div>
        <div className="relative">
          <Bell className="text-yellow-400 w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
            3
          </div>
        </div>
      </div>
    </motion.nav>
  );
}