import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function numDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
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

class Month extends React.Component {
  render() {
    const endDate = lastDayOfMonth(this.props.date);
    const numDays = numDaysInMonth(this.props.date);

    return (
      <div>
        <p className="text-muted text-xs-center">{MONTHS[endDate.getMonth()]}</p>
        <CalendarHeatmap
          endDate={endDate}
          numDays={numDays}
          horizontal={false}
          showMonthLabels={false}
          values={[]}
          classForValue={calendarClassForValue}
          gutterSize={0.5}
        />
      </div>
    );
  }
}

export default Month;
