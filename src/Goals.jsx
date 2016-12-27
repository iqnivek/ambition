// TODO rename as dashboard?
// TODO use router to show full completion history (vertical months)
// TODO add ordering/dragdrop?
// TODO use react-bootstrap? flexboxgrid?

import React from 'react';
import _ from 'lodash';
import CircularProgressbar from 'react-circular-progressbar';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import GoalList from './GoalList';
import Month from './Month';
import { createGoal, fetchGoals } from './actions';
import { calendarClassForValue, getLatestGoalCompletions } from './helpers';

class Goals extends React.Component {
  constructor(props) {
    super(props);

    this.onClickNewGoal = this.onClickNewGoal.bind(this);
    this.onCancelNewGoal = this.onCancelNewGoal.bind(this);
    this.onSubmitNewGoal = this.onSubmitNewGoal.bind(this);
    this.onChangeGoalName = this.onChangeGoalName.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchGoals());
  }

  onClickNewGoal() {
    this.props.dispatch({
      type: 'SHOW_NEW_GOAL'
    });
  }

  onCancelNewGoal() {
    this.props.dispatch({
      type: 'HIDE_NEW_GOAL'
    });
  }

  onSubmitNewGoal() {
    this.props.dispatch(createGoal(this.props.newGoal));
  }

  onChangeGoalName(event) {
    this.props.dispatch({
      type: 'UPDATE_NEW_GOAL',
      goal: update(this.props.newGoal, {
        name: { $set: event.target.value }
      })
    });
  }

  onClickDate(value) {
    // TODO make ajax requests
    console.log(value);

    this.props.dispatch({
      type: 'SELECT_DATE',
      date: value.date,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  getCurrentCompletion() {
    if (this.props.goals.length === 0) {
      return 0;
    }
    const numCompleted = Object.values(getLatestGoalCompletions(this.props.goalCompletions)).filter(({ complete }) => complete).length;
    const numTotal = this.props.goals.length;
    return Math.ceil(numCompleted / numTotal * 100);
  }

  // TODO make this a modal
  renderNewGoal() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <p className="text-xs-center">what's your goal?</p>
          <input
            type="text"
            className="form-control"
            value={this.props.newGoal.name}
            autoFocus
            onChange={this.onChangeGoalName}
          />
        </div>

        <div className="text-xs-center">
          <p>which days of the week?</p>
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
    );
  }

  renderAddGoal() {
    return !this.props.newGoal ? (
      <div className="text-xs-center">
        <button className="btn btn-lg btn-outline-primary" onClick={this.onClickNewGoal}>Add goal</button>
      </div>
    ) : null;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row my-3">
            <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="text-xs-center mb-3">ambition</h1>
              <div className="row">
                <div className="col-xs-8 offset-xs-2">
                  <Month
                    date={this.props.selectedDate}
                    values={this.props.goalCompletionHistories}
                    classForValue={calendarClassForValue}
                    onClick={this.onClickDate}
                  />
                </div>
                <div className="col-xs-4 offset-xs-4 mt-3">
                  <p className="text-muted text-xs-center">{this.props.selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                  <CircularProgressbar percentage={this.getCurrentCompletion()} />
                </div>
              </div>

              <div className="mt-2">
                <GoalList
                  goals={this.props.goals}
                  goalCompletions={this.props.goalCompletions}
                />
                {this.props.newGoal ? this.renderNewGoal() : null}
                {this.renderAddGoal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// TODO
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Goals);
