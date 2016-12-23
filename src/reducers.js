import { combineReducers } from 'redux';
import update from 'immutability-helper';

const rootReducer = combineReducers({
  goals: (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_GOALS':
        return action.goals;
      case 'CREATE_GOAL':
        return state.concat(action.goal);
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
      case 'HIDE_NEW_GOAL':
        return null;
      case 'UPDATE_NEW_GOAL':
        return action.goal;
      case 'CREATE_GOAL':
        return null;
      default:
        return state;
    }
  },
});

export default rootReducer;
