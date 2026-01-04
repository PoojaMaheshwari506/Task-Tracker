// src/components/analytics/StatusDonut.jsx

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { getStatusStats } from "../utils/analyticsHelpers.js";

const COLORS = ["#86EFAC", "#FDBA74"];
 // green, orange (theme friendly)

function StatusDonut({ tasks }) {
  const { completed, pending } = getStatusStats(tasks);

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="chart-card">
      <h3 className="chart-title">Task Status</h3>

      <PieChart width={260} height={260}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>

      <div className="chart-legend">
        <span className="legend completed">Completed</span>
        <span className="legend pending">Pending</span>
      </div>
    </div>
  );
}

export default StatusDonut;
