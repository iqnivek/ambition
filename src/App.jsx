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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const today = new Date();
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
      isAddingGoal: false,
    };

    this.onClickAddGoal = this.onClickAddGoal.bind(this);
    this.onCancelAddGoal = this.onCancelAddGoal.bind(this);
  }

  onClickAddGoal() {
    this.setState({
      isAddingGoal: true,
    });
  }

  onCancelAddGoal() {
    this.setState({
      isAddingGoal: false,
    });
  }

  onCompleteGoal(goalID, complete) {
    this.setState(update(this.state, {
      completedGoals: {
        [goalID]: { $set: complete }
      }
    }));
  }

  renderMonths() {
    return [0, -1, -2].map((index) => (
      <div key={index} className="col-xs-4">
        <div>{MONTHS[currentMonth]}</div>
        <CalendarHeatmap numDays={30} horizontal={false} showMonthLabels={false} values={[]} />
      </div>
    ));
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
          this.state.isAddingGoal ? (
            <li className="active">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="goal name" />
                </div>

                <div className="text-xs-center">
                  <div>Target: {7} times per week</div>
                  {_.range(7).map((index) => (
                    <span key={index} className="count-circle">
                      <i className="fa fa-circle" />
                    </span>
                  ))}
                  <div className="m-t-2">
                    <button className="btn btn-outline-primary">Add goal</button>
                    <button className="btn btn-outline-secondary m-l-1" onClick={this.onCancelAddGoal}>Cancel</button>
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
    return !this.state.isAddingGoal ? (
      <div className="text-xs-center">
        <button className="btn btn-lg btn-outline-primary" onClick={this.onClickAddGoal}>Add goal</button>
      </div>
    ) : null;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row m-y-3">
            <div className="col-xs-12 col-sm-6 offset-sm-3">
              <h1 className="text-xs-center">Ambition</h1>

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
