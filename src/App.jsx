// TODO add circular progressbar for today's progress
// TODO use router to show full completion history (vertical months)
// TODO add ordering/dragdrop?
// TODO use react-bootstrap? flexboxgrid?

import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import classNames from 'classnames';
import update from 'immutability-helper';
import CompletionHistory from './CompletionHistory';
import Month from './Month';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      goalCompletions: [],
      goalCompletionHistories: [],
      newGoal: null,
    };

    this.onClickNewGoal = this.onClickNewGoal.bind(this);
    this.onCancelNewGoal = this.onCancelNewGoal.bind(this);
    this.onSubmitNewGoal = this.onSubmitNewGoal.bind(this);
    this.onChangeGoalName = this.onChangeGoalName.bind(this);
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/goals'),
      axios.get('/api/goal_completions', { params: { date: (new Date()).toISOString() } }),
      axios.get('/api/goal_completion_histories'),
    ]).then(axios.spread((goalsResponse, goalCompletionsResponse, goalCompletionHistoriesResponse) => {
      this.setState({
        goals: goalsResponse.data,
        goalCompletions: goalCompletionsResponse.data,
        goalCompletionHistories: goalCompletionHistoriesResponse.data,
      });
    }));
  }

  onClickNewGoal() {
    this.setState({
      newGoal: {
        name: '',
      }
    });
  }

  onCancelNewGoal() {
    this.setState({
      newGoal: null,
    });
  }

  onSubmitNewGoal() {
    axios.post(
      '/api/goals',
      this.state.newGoal
    ).then((response) => {
      const newGoal = response.data;
      this.setState(update(this.state, {
        goals: { $push: [newGoal] },
        newGoal: { $set: null },
      }));
    });
  }

  onChangeGoalName(event) {
    this.setState(update(this.state, {
      newGoal: {
        name: { $set: event.target.value }
      }
    }));
  }

  onCompleteGoal(goalID, complete) {
    axios.post('/api/goal_completions', {
      time: (new Date()).toISOString(),
      goal_id: goalID,
      complete: complete,
    }).then((response) => {
      console.log('onCompleteGoal', response);

      this.setState(update(this.state, {
        goalCompletions: { $push: [response.data] }
      }));
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  getGoalCompletion(id) {
    const latestCompletions = this.state.goalCompletions
      .filter(({ time, goal_id }) => goal_id === id)
      .sort(({ time }) => time)
      .reverse();
    return (latestCompletions.length > 0) && latestCompletions[0].complete;
  }

  // TODO make this a modal
  renderNewGoal() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <p className="text-xs-center">what's your goal?</p>
          <input
            type="text"
            className="form-control"
            value={this.state.newGoal.name}
            autoFocus
            onChange={this.onChangeGoalName}
          />
        </div>

        <div className="text-xs-center">
          <p>which days of the week?</p>
          {_.range(7).map((index) => (
            <span key={index} className="count-circle">
              <i className="fa fa-circle" />
            </span>
          ))}

          <div className="m-t-2">
            <button className="btn btn-outline-primary" onClick={this.onSubmitNewGoal}>Add goal</button>
            <button className="btn btn-outline-secondary m-l-1" onClick={this.onCancelNewGoal}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }

  renderGoals() {
    return (
      <ul className="goals list-unstyled">
        {
          this.state.goals.map((goal) => {
            const complete = this.getGoalCompletion(goal.id);

            return (
              <li
                key={goal.id}
                className={classNames('goal', { 'active': !complete })}
                onClick={this.onCompleteGoal.bind(this, goal.id, !complete)}
              >
                <span className="goal-checkbox">
                  <i className={classNames('fa', complete ? 'fa-check-circle' : 'fa-circle-thin')} />
                </span>
                {goal.name}
              </li>
            );
          })
        }
      </ul>
    );
  }

  renderAddGoal() {
    return !this.state.newGoal ? (
      <div className="text-xs-center">
        <button className="btn btn-lg btn-outline-primary" onClick={this.onClickNewGoal}>Add goal</button>
      </div>
    ) : null;
  }

  render() {
    const today = new Date();
    return (
      <div>
        <div className="container">
          <div className="row my-3">
            <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="text-xs-center mb-3">ambition</h1>
              <div className="row">
                <div className="col-xs-8 offset-xs-2">
                  <Month date={today} values={this.state.goalCompletionHistories} />
                </div>
              </div>

              <div className="mt-3">
                {this.renderGoals()}
                {this.state.newGoal ? this.renderNewGoal() : null}
                {this.renderAddGoal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
