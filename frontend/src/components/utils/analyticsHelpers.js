// src/utils/analyticsHelpers.js

export const getStatusStats = (tasks = []) => {
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  return {
    completed,
    pending,
    total: tasks.length,
    completionRate: tasks.length
      ? Math.round((completed / tasks.length) * 100)
      : 0,
  };
};

export const getPriorityStats = (tasks = []) => {
  return [
    {
      name: "High",
      value: tasks.filter(t => t.priority === "High").length,
    },
    {
      name: "Medium",
      value: tasks.filter(t => t.priority === "Medium").length,
    },
    {
      name: "Low",
      value: tasks.filter(t => t.priority === "Low").length,
    },
  ];
};

export const getWeeklyTrend = (tasks = []) => {
  const map = {};

  tasks.forEach(task => {
    if (!task.due_date) return;

    const date = task.due_date; // YYYY-MM-DD
    map[date] = (map[date] || 0) + 1;
  });

  return Object.keys(map)
    .sort()
    .map(date => ({
      date,
      tasks: map[date],
    }));
};
