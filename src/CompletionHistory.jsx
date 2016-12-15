// TODO use Month component
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
const currentDay = today.getDay();

class CompletionHistory extends React.Component {
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
            values={[]}
            classForValue={calendarClassForValue}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="months">
        {this.renderMonths()}
      </div>
    );
  }
}

export default CompletionHistory;
