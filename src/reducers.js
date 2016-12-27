import { combineReducers } from 'redux';

const today = new Date();

const rootReducer = combineReducers({
  selectedDate: (state = today, action) => {
    switch (action.type) {
      case 'SELECT_DATE':
        return action.date;
      default:
        return state;
    }
  },
  goals: (state = {
    isFetching: false,  // TODO make this a request counter instead of bool
    didInvalidate: false,
    goals: [],
    completions: [],
  }, action) => {
    switch (action.type) {
      case 'REQUEST_GOALS':
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false,
        });
      case 'RECEIVE_GOALS':
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          goals: action.goals,
          completions: action.completions,
        });
      case 'CREATE_GOAL':
        return Object.assign({}, state, {
          goals: state.goals.concat(action.goal),
        });
      case 'CREATE_GOAL_COMPLETION':
        return Object.assign({}, state, {
          completions: state.completions.concat(action.completion),
        });
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
