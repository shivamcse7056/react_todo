export const selectTasksByStatus = (state, status) => {
  const allIds = state.tasks.allIds || [];
  const byId = state.tasks.byId || {};

  return allIds
    .map(id => byId[id])
    .filter(task => task.status === status);
};