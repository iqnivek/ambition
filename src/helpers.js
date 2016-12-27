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

export function calendarClassForValue(value) {
  if (!value || !value.target_score) {
    return 'color-gitlab-0';
  }

  const completion = value.completed_score / value.target_score;
  if (completion <= 0) {
    return 'color-gitlab-0';
  } else if (completion < 0.25) {
    return 'color-gitlab-1';
  } else if (completion < 0.50) {
    return 'color-gitlab-2';
  } else if (completion < 0.75) {
    return 'color-gitlab-3';
  } else {
    return 'color-gitlab-4';
  }
}
