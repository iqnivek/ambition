import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createGoalCompletion } from './actions';
import { getLatestGoalCompletions } from './helpers';

class GoalList extends React.Component {
  getGoalCompletion(id) {
    const latest = getLatestGoalCompletions(this.props.goalCompletions);
    return latest[id] ? latest[id].complete : false;
  }

  onCompleteGoal(goalID, isComplete) {
    this.props.dispatch(createGoalCompletion(goalID, isComplete));
  }

  render() {
    return (
      <ul className="goals list-unstyled">
        {
          this.props.goals.map((goal) => {
            const complete = this.getGoalCompletion(goal.id);

            return (
              <li
                key={goal.id}
                className={classNames('goal', { 'active': !complete })}
                onClick={this.onCompleteGoal.bind(this, goal.id, !complete)}
              >
                <span className="goal-checkbox">
                  <i className={classNames('fa', complete ? 'fa-check-circle' : 'fa-circle-thin')} />
                </span>
                {goal.name}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default connect()(GoalList);
