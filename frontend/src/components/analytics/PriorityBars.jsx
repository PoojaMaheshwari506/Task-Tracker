// src/components/analytics/PriorityBars.jsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriorityStats } from "../utils/analyticsHelpers";

function PriorityBars({ tasks }) {
  const data = getPriorityStats(tasks);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Tasks by Priority</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
  dataKey="value"
  fill="#9eb2eeff"   
  radius={[8, 8, 0, 0]}
/>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriorityBars;
