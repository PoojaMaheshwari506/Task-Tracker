
import { useEffect, useState } from "react";
import StatCards from "../components/analytics/StatCards";
import StatusDonut from "../components/analytics/StatusDonut";
import PriorityBars from "../components/analytics/PriorityBars";
import WeeklyTrend from "../components/analytics/WeeklyTrend";
import AnalyticsGrid from "../components/analytics/AnalyticsGrid";

import "../styles/analytics.css";

function Analytics() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tasker-backend-4xbv.onrender.com", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Analytics fetch error:", err);
        setTasks([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="analytics-loading">Loading analytics…</div>;
  }

  return (
    <div className="analytics-page">
    

      {/* KPI cards */}
      <StatCards tasks={tasks} />

      {/* Charts grid */}
     <AnalyticsGrid>
  <StatusDonut tasks={tasks} />
  <PriorityBars tasks={tasks} />
  <WeeklyTrend tasks={tasks} />
</AnalyticsGrid>

    </div>
  );
}

export default Analytics;
