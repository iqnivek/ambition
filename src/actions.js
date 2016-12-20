import axios from 'axios';

export function fetchGoals() {
  return (dispatch) => {
    axios.all([
      axios.get('/api/goals'),
      axios.get('/api/goal_completions', { params: { date: (new Date()).toISOString() } }),
      axios.get('/api/goal_completion_histories'),
    ]).then(axios.spread((goalsResponse, goalCompletionsResponse, goalCompletionHistoriesResponse) => {
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
