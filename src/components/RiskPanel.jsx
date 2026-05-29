import { motion } from "framer-motion";
import { Droplets, Mountain, Zap, Wind } from "lucide-react";

const risks = [
  { label: "Flood Risk",      value: 72, color: "#60a5fa", icon: Droplets, level: "HIGH" },
  { label: "Landslide",       value: 85, color: "#f87171", icon: Mountain, level: "CRITICAL" },
  { label: "Earthquake",      value: 30, color: "#34d399", icon: Zap,      level: "LOW" },
  { label: "Storm",           value: 55, color: "#facc15", icon: Wind,     level: "MODERATE" },
];

export default function RiskPanel() {
  return (
    <div className="space-y-3">
      {risks.map((risk, i) => {
        const Icon = risk.icon;
        return (
          <motion.div
            key={risk.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${risk.color}30`,
              boxShadow: `0 0 20px ${risk.color}10`
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" style={{ color: risk.color }} />
                <span className="text-xs font-semibold text-gray-300">{risk.label}</span>
              </div>
              <span
                className="text-xs font-black px-2 py-0.5 rounded-full"
                style={{ color: risk.color, background: `${risk.color}20` }}
              >
                {risk.level}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${risk.value}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-1.5 rounded-full"
                style={{ background: risk.color, boxShadow: `0 0 8px ${risk.color}` }}
              />
            </div>
            <p className="text-right text-xs mt-1" style={{ color: risk.color }}>
              {risk.value}%
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}