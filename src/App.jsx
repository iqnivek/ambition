import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import range from 'lodash.range';

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
  renderMonths() {
    return [0, -1, -2].map((index) => (
      <div key={index} className="col-xs-4">
        <div>{MONTHS[currentMonth]}</div>
        <CalendarHeatmap numDays={30} horizontal={false} showMonthLabels={false} values={[]} />
      </div>
    ));
  }

  renderWeek() {
    return range(7).map((index) => {
      const className = index === currentDay ? 'day active' : 'day';
      return <div key={index} className={className}>{DAYS[index]}</div>
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row m-y-3">
            <div className="col-xs-12 col-sm-6 offset-sm-3">
              <h1 className="text-xs-center">Ambition</h1>
              <p className="text-xs-center">Paint everything turquoise.</p>

              <div className="row">
                {this.renderMonths()}
              </div>

              <div>
                {this.renderWeek()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
