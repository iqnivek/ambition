import axios from 'axios';

export function fetchGoals() {
  return (dispatch) => {
    axios.all([
      axios.get('/api/goals'),
      axios.get('/api/goal_completions', { params: { date: (new Date()).toISOString() } }),
      axios.get('/api/goal_completion_histories'),
    ]).then(axios.spread((goalsResponse, goalCompletionsResponse, goalCompletionHistoriesResponse) => {

      // TODO should these all be separate?
      dispatch({
        type: 'RECEIVE_GOALS',
        goals: goalsResponse.data,
      });
      dispatch({
        type: 'RECEIVE_GOAL_COMPLETIONS',
        goalCompletions: goalCompletionsResponse.data,
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
