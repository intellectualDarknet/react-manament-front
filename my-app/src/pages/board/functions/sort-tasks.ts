function sortTasks(columns: IColumnResponse[], tasks: ITask[]): Map<string, ITask[]> {
  const sortedTasks = new Map();
  if (columns && tasks) {
    columns.forEach((column) => {
      const tasksArr = tasks.filter((task) => column._id === task.columnId);
      sortedTasks.set(column._id, tasksArr);
    });
  }

  return sortedTasks;
}

export default sortTasks;
