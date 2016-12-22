import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  goals: (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_GOALS':
        return action.goals;
      default:
        return state;
    }
  },
  goalCompletions: (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_GOAL_COMPLETIONS':
        return action.goalCompletions;
      default:
        return state;
    }
  },
  goalCompletionHistories: (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_GOAL_COMPLETION_HISTORIES':
        return action.goalCompletionHistories;
      default:
        return state;
    }
  },
  newGoal: (state = null, action) => {
    switch (action.type) {
      case 'SHOW_NEW_GOAL':
        return {
          name: '',
        };
      default:
        return state;
    }
  },
});

export default rootReducer;
