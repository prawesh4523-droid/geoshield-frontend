import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const rainfallData = [
  { day: "Mon", mm: 12 },
  { day: "Tue", mm: 35 },
  { day: "Wed", mm: 58 },
  { day: "Thu", mm: 22 },
  { day: "Fri", mm: 80 },
  { day: "Sat", mm: 45 },
  { day: "Sun", mm: 67 },
];

const floodData = [
  { month: "Jan", risk: 20 },
  { month: "Feb", risk: 35 },
  { month: "Mar", risk: 50 },
  { month: "Apr", risk: 70 },
  { month: "May", risk: 90 },
  { month: "Jun", risk: 60 },
];

const landslideData = [
  { zone: "Kavre",     prob: 85 },
  { zone: "Sindhu",   prob: 60 },
  { zone: "Dolakha",  prob: 72 },
  { zone: "Rasuwa",   prob: 55 },
  { zone: "Nuwakot",  prob: 40 },
];

export default function RiskChart() {
  return (
    <div className="space-y-6">

      {/* RAINFALL CHART */}
      <div className="bg-gray-800 p-4 rounded-2xl">
        <h2 className="text-sm font-semibold text-cyan-400 mb-3">
          🌧 Weekly Rainfall (mm)
        </h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={rainfallData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            <Bar dataKey="mm" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FLOOD RISK TREND */}
      <div className="bg-gray-800 p-4 rounded-2xl">
        <h2 className="text-sm font-semibold text-blue-400 mb-3">
          🌊 Flood Risk Trend (%)
        </h2>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={floodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: "#60a5fa", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LANDSLIDE PROBABILITY */}
      <div className="bg-gray-800 p-4 rounded-2xl">
        <h2 className="text-sm font-semibold text-orange-400 mb-3">
          ⛰ Landslide Probability by Zone (%)
        </h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={landslideData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis dataKey="zone" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={55} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            <Bar dataKey="prob" fill="#fb923c" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}