import React from 'react';
import _ from 'lodash';
import CalendarHeatmap from 'react-calendar-heatmap';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function numDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function isSameDate(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

function calendarClassForValue(value) {
  if (!value || !value.target_score) {
    return 'color-gitlab-0';
  }

  const completion = value.completed_score / value.target_score;
  if (completion <= 0) {
    return 'color-gitlab-0';
  } else if (completion < 0.25) {
    return 'color-gitlab-1';
  } else if (completion < 0.50) {
    return 'color-gitlab-2';
  } else if (completion < 0.75) {
    return 'color-gitlab-3';
  } else {
    return 'color-gitlab-4';
  }
}

class Month extends React.Component {
  render() {
    const endDate = lastDayOfMonth(this.props.date);
    const numDays = numDaysInMonth(this.props.date);

    const startDate = firstDayOfMonth(this.props.date);
    const missingMonthValues = _.range(numDays).map((idx) => {
      return { date: shiftDate(startDate, idx) }
    }).filter(({ date }) => {
      return !_.find(this.props.values, (value) => {
        const valDate = new Date(value.date);
        return isSameDate(valDate, date);
      });
    });
    const valuesWithoutGaps = this.props.values.concat(missingMonthValues);

    return (
      <div>
        <p className="text-muted text-xs-center">{MONTHS[endDate.getMonth()]}</p>
        <CalendarHeatmap
          endDate={endDate}
          numDays={numDays}
          horizontal={false}
          showMonthLabels={false}
          values={valuesWithoutGaps}
          classForValue={calendarClassForValue}
          gutterSize={0.5}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

export default Month;
