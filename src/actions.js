import axios from 'axios';

export function fetchGoals() {
  return (dispatch) => {
    dispatch({ type: 'REQUEST_GOALS' });

    axios.all([
      axios.get('/api/goals'),
      axios.get('/api/goal_completions', { params: { date: (new Date()).toISOString() } }),
      axios.get('/api/goal_completion_histories'),
    ]).then(axios.spread((goalsResponse, goalCompletionsResponse, goalCompletionHistoriesResponse) => {
      dispatch({
        type: 'RECEIVE_GOALS',
        goals: goalsResponse.data,
        completions: goalCompletionsResponse.data,
      });
      dispatch({
        type: 'RECEIVE_GOAL_COMPLETION_HISTORIES',
        goalCompletionHistories: goalCompletionHistoriesResponse.data,
      });
    }));
  };
}

export function createGoal(goal) {
  return (dispatch) => {
    axios.post(
      '/api/goals',
      goal
    ).then((response) => {
      const createdGoal = response.data;
      dispatch({
        type: 'CREATE_GOAL',
        goal: createdGoal,
      });
    });
  };
}

export function createGoalCompletion(goalID, isComplete) {
  return (dispatch) => {
    axios.post('/api/goal_completions', {
      time: (new Date()).toISOString(),
      goal_id: goalID,
      complete: isComplete,
    }).then((response) => {
      dispatch({
        type: 'CREATE_GOAL_COMPLETION',
        completion: response.data,
      });
    });
  };
}
