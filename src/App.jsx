import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import classNames from 'classnames';
import CalendarHeatmap from 'react-calendar-heatmap';
import update from 'immutability-helper';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function lastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}

function numDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function calendarClassForValue(value) {
  if (!value) {
    return 'color-gitlab-0';
  }
  if (value.completion <= 0) {
    return 'color-gitlab-0';
  } else if (value.completion < 25) {
    return 'color-gitlab-1';
  } else if (value.completion < 50) {
    return 'color-gitlab-2';
  } else if (value.completion < 75) {
    return 'color-gitlab-3';
  } else {
    return 'color-gitlab-4';
  }
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
const currentDay = today.getDay();

const initialState = {
  goals: [],
  goalCompletions: [],
  newGoal: null,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onClearData = this.onClearData.bind(this);
    this.onClickNewGoal = this.onClickNewGoal.bind(this);
    this.onCancelNewGoal = this.onCancelNewGoal.bind(this);
    this.onSubmitNewGoal = this.onSubmitNewGoal.bind(this);
    this.onChangeGoalName = this.onChangeGoalName.bind(this);
  }

  componentDidMount() {
    axios.get(
      '/api/goals'
    ).then((response) => {
      this.setState({
        goals: response.data
      });
    });
  }

  onClearData() {
    this.setState(initialState);
  }

  onClickNewGoal() {
    this.setState({
      newGoal: {
        id: Math.random(), // TODO
        name: '',
        timesPerWeek: 7,
      }
    });
  }

  onCancelNewGoal() {
    this.setState({
      newGoal: null,
    });
  }

  onSubmitNewGoal() {
    const newGoal = Object.assign({}, this.state.newGoal);
    this.setState({
      goals: this.state.goals.concat(newGoal),
      newGoal: null,
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
      goal_id: goalID
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
    const match = this.state.goalCompletions.filter(({ time, goal_id }) => goal_id === id);
    return (match.length > 0) ? match[0] : null;
  }

  renderMonths() {
    return [-3, -2, -1, 0].map((index) => {
      const endDate = lastDayOfMonth(currentYear, currentMonth + index);
      const numDays = numDaysInMonth(currentMonth, currentMonth + index);
      return (
        <div key={index} className="month">
          <p className="text-muted text-xs-center">{MONTHS[endDate.getMonth()]}</p>
          <CalendarHeatmap
            endDate={endDate}
            numDays={numDays}
            horizontal={false}
            showMonthLabels={false}
            values={[
              { date: today, completion: 100 }
            ]}
            classForValue={calendarClassForValue}
          />
        </div>
      );
    });
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
                className={classNames({ 'active': !complete })}
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

        {
          this.state.newGoal ? (
            <li className="active">
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
                  <p>how many times per week?</p>
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
            </li>
          ) : null
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
    return (
      <div>
        <div className="container">
          <div className="row m-y-3">
            <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="text-xs-center m-b-3">ambition</h1>

              <div className="months">
                {this.renderMonths()}
              </div>

              <div className="m-t-3">
                {this.renderGoals()}

                {this.renderAddGoal()}
              </div>

              <div className="text-xs-center m-t-3">
                <small><a className="text-muted" href="#" onClick={this.onClearData}>clear data</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
