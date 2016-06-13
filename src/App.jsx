import React from 'react';
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
    };
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
          this.state.goals.map((goal) => (
            <li key={goal.id} className={this.state.completedGoals[goal.id] ? null : 'active'}>{goal.name}</li>
          ))
        }
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row m-y-3">
            <div className="col-xs-12 col-sm-6 offset-sm-3">
              <h1 className="text-xs-center">Ambition</h1>
              <p className="text-xs-center">Paint it turquoise.</p>

              <div className="row m-t-3">
                {this.renderMonths()}
              </div>

              <div className="m-t-3">
                {this.renderWeek()}
              </div>

              <div className="m-t-3">
                {this.renderGoals()}

                <div className="text-xs-center">
                  <button className="btn btn-lg btn-outline-primary">Add goal</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
