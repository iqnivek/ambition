//
// Generic wrapper around CalendarHeatmap for month-based display
//

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

class Month extends React.Component {
  render() {
    const startDate = firstDayOfMonth(this.props.date);
    const endDate = lastDayOfMonth(this.props.date);
    const numDays = numDaysInMonth(this.props.date);

    // replace original values with normalized Date objects
    // fill in missing dates
    // highlight selected date
    const normalizedValuesWithoutGaps = _.range(numDays).map((idx) => {
      const date = shiftDate(startDate, idx)
      const valueObj = _.find(this.props.values, (value) => {
        return isSameDate(new Date(value.date), date);
      }) || {};

      return Object.assign({}, valueObj, {
        date: date,
        selected: isSameDate(date, this.props.date),
      });
    });

    return (
      <div>
        <p className="text-muted text-xs-center">{MONTHS[endDate.getMonth()]}</p>
        <CalendarHeatmap
          endDate={endDate}
          numDays={numDays}
          horizontal={false}
          showMonthLabels={false}
          values={normalizedValuesWithoutGaps}
          classForValue={this.props.classForValue}
          gutterSize={0.5}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

export default Month;
