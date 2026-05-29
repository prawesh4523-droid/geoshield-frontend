import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, BarChart2, Bot, MapPin, Hospital } from "lucide-react";
import RiskPanel from "./RiskPanel";
import Analytics from "./Analytics";
import AlertBox from "./AlertBox";

const tabs = [
  { id: "alerts",    label: "Alerts",    icon: ShieldAlert },
  { id: "risks",     label: "Risks",     icon: BarChart2   },
  { id: "analytics", label: "Charts",    icon: BarChart2   },
];

export default function Sidebar({ shelters, hospitals, prediction, form, setForm, onPredict, loading }) {
  const [activeTab, setActiveTab] = useState("alerts");

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-80 flex flex-col z-[1000] overflow-hidden"
      style={{
        background: "rgba(5,10,20,0.85)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(0,255,255,0.1)",
        boxShadow: "4px 0 30px rgba(0,255,255,0.05)"
      }}
    >
      {/* STATS ROW */}
      <div className="grid grid-cols-2 gap-2 p-4 pt-20">
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)" }}>
          <MapPin className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
          <p className="text-2xl font-black text-cyan-400">{shelters.length}</p>
          <p className="text-xs text-gray-400">Shelters</p>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
          <Hospital className="w-4 h-4 text-red-400 mx-auto mb-1" />
          <p className="text-2xl font-black text-red-400">{hospitals.length}</p>
          <p className="text-xs text-gray-400">Hospitals</p>
        </div>
      </div>

      {/* AI PREDICTOR */}
      <div className="mx-4 mb-4 p-4 rounded-xl" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-purple-400" />
          <p className="text-sm font-bold text-purple-400 tracking-wider">AI RISK PREDICTOR</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { key: "rainfall",     placeholder: "Rainfall mm",  },
            { key: "slope",        placeholder: "Slope °",       },
            { key: "soil_moisture",placeholder: "Moisture %",    },
            { key: "temperature",  placeholder: "Temp °C",       },
          ].map(field => (
            <input
              key={field.key}
              type="number"
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="bg-gray-900 text-white px-2 py-1.5 rounded-lg text-xs outline-none focus:ring-1 focus:ring-purple-500 w-full"
            />
          ))}
        </div>
        <button
          onClick={onPredict}
          disabled={loading}
          className="w-full py-2 rounded-lg text-xs font-black tracking-widest transition-all"
          style={{ background: loading ? "#4b2d7a" : "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
        >
          {loading ? "ANALYZING..." : "⚡ PREDICT RISK"}
        </button>

        {prediction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-3 p-3 rounded-xl text-center ${
              prediction.risk_level === "HIGH"
                ? "bg-red-900/40 border border-red-500/50"
                : "bg-green-900/40 border border-green-500/50"
            }`}
          >
            <p className="text-2xl">{prediction.risk_level === "HIGH" ? "🚨" : "✅"}</p>
            <p className={`text-sm font-black ${prediction.risk_level === "HIGH" ? "text-red-400" : "text-green-400"}`}>
              {prediction.risk_level} RISK
            </p>
            <p className="text-gray-400 text-xs">Confidence: {prediction.confidence}%</p>
          </motion.div>
        )}
      </div>

      {/* TABS */}
      <div className="flex mx-4 mb-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-bold tracking-wider transition-all ${
              activeTab === tab.id
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {activeTab === "alerts"    && <AlertBox />}
        {activeTab === "risks"     && <RiskPanel />}
        {activeTab === "analytics" && <Analytics />}
      </div>

    </motion.div>
  );
}