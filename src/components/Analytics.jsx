import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const rainfallData = [
  { day: "Mon", mm: 12 }, { day: "Tue", mm: 35 },
  { day: "Wed", mm: 58 }, { day: "Thu", mm: 22 },
  { day: "Fri", mm: 80 }, { day: "Sat", mm: 45 },
  { day: "Sun", mm: 67 },
];

const floodData = [
  { month: "Jan", risk: 20 }, { month: "Feb", risk: 35 },
  { month: "Mar", risk: 50 }, { month: "Apr", risk: 70 },
  { month: "May", risk: 90 }, { month: "Jun", risk: 60 },
];

const tooltipStyle = {
  contentStyle: { backgroundColor: "#0f172a", border: "1px solid #22d3ee33", borderRadius: "8px" },
  labelStyle: { color: "#e5e7eb" }
};

export default function Analytics() {
  return (
    <div className="space-y-4">

      {/* RAINFALL */}
      <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(34,211,238,0.15)" }}>
        <p className="text-xs font-bold text-cyan-400 mb-2">🌧 WEEKLY RAINFALL (mm)</p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={rainfallData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="mm" fill="#22d3ee" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FLOOD TREND */}
      <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(96,165,250,0.15)" }}>
        <p className="text-xs font-bold text-blue-400 mb-2">🌊 FLOOD RISK TREND (%)</p>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={floodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey="risk" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}