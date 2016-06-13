import React from 'react';
import update from 'react-addons-update';
import classNames from 'classnames';
import CalendarHeatmap from 'react-calendar-heatmap';
import CircularProgressbar from 'react-circular-progressbar';
import _ from 'lodash';

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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const today = new Date();
const currentYear = today.getYear();
const currentMonth = today.getMonth();
const currentDay = today.getDay();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [
        { id: 1, name: 'wake up early' },
        { id: 2, name: 'go to gym' },
      ],
      completedGoals: {
        2: true,
      },
      newGoal: null,
    };

    this.onClickNewGoal = this.onClickNewGoal.bind(this);
    this.onCancelNewGoal = this.onCancelNewGoal.bind(this);
    this.onSubmitNewGoal = this.onSubmitNewGoal.bind(this);
    this.onChangeGoalName = this.onChangeGoalName.bind(this);
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
    this.setState({
      goals: this.state.goals.concat(this.state.newGoal),
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
    this.setState(update(this.state, {
      completedGoals: {
        [goalID]: { $set: complete }
      }
    }));
  }

  renderMonths() {
    return [-2, -1, 0].map((index) => {
      const endDate = lastDayOfMonth(currentYear, currentMonth + index);
      const numDays = numDaysInMonth(currentMonth, currentMonth + index);
      return (
        <div key={index} className="col-xs-4">
          <p className="text-xs-center">{MONTHS[endDate.getMonth()]}</p>
          <CalendarHeatmap
            endDate={endDate}
            numDays={30}
            horizontal={false}
            showMonthLabels={false}
            values={[]}
          />
        </div>
      );
    });
  }

  renderWeek() {
    const size = `${100 / 7.0}%`;
    return _.range(7).map((index) => {
      return (
        <div key={index} className={index === currentDay ? 'day active' : 'day'} style={{ width: size }}>
          <CircularProgressbar percentage={0} textForPercentage={(percentage) => DAYS[index]} />
        </div>
      );
    });
  }

  renderGoals() {
    return (
      <ul className="goals list-unstyled">
        {
          this.state.goals.map((goal) => {
            const complete = this.state.completedGoals[goal.id];

            return (
              <li key={goal.id} className={complete ? null : 'active'}>
                <span className="goal-checkbox" onClick={this.onCompleteGoal.bind(this, goal.id, !complete)}>
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
              <form>
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
            <div className="col-xs-12 col-sm-6 offset-sm-3">
              <h1 className="text-xs-center">ambition</h1>

              <div className="row m-t-3">
                {this.renderMonths()}
              </div>

              <div className="m-t-3">
                {this.renderWeek()}
              </div>

              <div className="m-t-3">
                {this.renderGoals()}

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
