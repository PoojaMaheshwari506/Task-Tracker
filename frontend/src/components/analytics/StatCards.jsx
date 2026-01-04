// src/components/analytics/StatCards.jsx

import {
  getStatusStats,
} from "../utils/analyticsHelpers";

function StatCards({ tasks }) {
  const {
    total,
    completed,
    pending,
    completionRate,
  } = getStatusStats(tasks);

  return (
    <div className="stat-cards">
      <div className="stat-card">
        <p className="stat-label">Total Tasks</p>
        <h2 className="stat-value">{total}</h2>
      </div>

      <div className="stat-card success">
        <p className="stat-label">Completed</p>
        <h2 className="stat-value">{completed}</h2>
      </div>

      <div className="stat-card warning">
        <p className="stat-label">Pending</p>
        <h2 className="stat-value">{pending}</h2>
      </div>

      <div className="stat-card info">
        <p className="stat-label">Completion Rate</p>
        <h2 className="stat-value">{completionRate}%</h2>
      </div>
    </div>
  );
}

export default StatCards;
