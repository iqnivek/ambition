import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
const currentDay = today.getDay();

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
