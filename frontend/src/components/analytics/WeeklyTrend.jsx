// src/components/analytics/WeeklyTrend.jsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getWeeklyTrend } from "../utils/analyticsHelpers";

function WeeklyTrend({ tasks }) {
  const data = getWeeklyTrend(tasks);

  return (
    <div className="chart-card full-width">
      <h3 className="chart-title">Tasks Over Time</h3>

      {data.length === 0 ? (
        <p className="empty-chart-text">
          No date-based data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#818CF8"
              strokeWidth={3}
              dot={{ r: 4 }}
              dot={{ r: 5, fill: "#818CF8" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default WeeklyTrend;
