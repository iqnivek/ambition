import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class App extends React.Component {
  renderMonths() {
    const today = new Date();
    const currentMonth = today.getMonth();

    return [0, -1, -2].map((index) => (
      <div key={index} className="col-xs-4">
        <div>{MONTHS[currentMonth]}</div>
        <CalendarHeatmap numDays={30} horizontal={false} showMonthLabels={false} values={[]} />
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 offset-sm-3">
              <h1 className="text-xs-center">Ambition</h1>
              <p className="text-xs-center">Make everything turquoise.</p>

              <div className="row">
                {this.renderMonths()}
              </div>

              <div>Sun Mon Tue Wed Thu Fri Sat</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
