export function getLatestGoalCompletions(goalCompletions) {
  const results = {};
  goalCompletions.forEach((completion) => {
    const prevCompletion = results[completion.goal_id];
    if (prevCompletion) {
      const prevTime = Date.parse(prevCompletion.time);
      const currTime = Date.parse(completion.time);
      if (currTime > prevTime) {
        results[completion.goal_id] = completion;
      }
    } else {
      results[completion.goal_id] = completion;
    }
  });
  return results;
}
