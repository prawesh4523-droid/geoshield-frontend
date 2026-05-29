import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Info, CheckCircle } from "lucide-react";
import { useState } from "react";

const alerts = [
  { id: 1, type: "danger", icon: AlertTriangle, message: "HIGH landslide risk in Kavrepalanchok", time: "2 min ago" },
  { id: 2, type: "warning", icon: AlertTriangle, message: "Heavy rainfall expected in Sindhupalchok", time: "15 min ago" },
  { id: 3, type: "info", icon: Info, message: "5 shelters at full capacity in Kathmandu", time: "1 hr ago" },
];

const colors = {
  danger: { border: "border-red-500", bg: "bg-red-500/10", text: "text-red-400", glow: "shadow-red-500/20" },
  warning: { border: "border-yellow-500", bg: "bg-yellow-500/10", text: "text-yellow-400", glow: "shadow-yellow-500/20" },
  info: { border: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20" },
};

export default function AlertBox() {
  const [dismissed, setDismissed] = useState([]);

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {alerts
          .filter(a => !dismissed.includes(a.id))
          .map((alert, i) => {
            const c = colors[alert.type];
            const Icon = alert.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-xl border ${c.border} ${c.bg} shadow-lg ${c.glow}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.text}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${c.text}`}>{alert.message}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{alert.time}</p>
                </div>
                <button onClick={() => setDismissed([...dismissed, alert.id])}>
                  <X className="w-3 h-3 text-gray-500 hover:text-white" />
                </button>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}