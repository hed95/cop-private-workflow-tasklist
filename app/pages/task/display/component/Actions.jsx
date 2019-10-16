import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import uuidv4 from 'uuid/v4';

// local imports
import { Claim } from './Claim';
import { Complete } from './Complete';
import Unclaim from './Unclaim';

const Actions = props => {
  const { task, variables } = props;
  let actionComponent = <React.Fragment></React.Fragment>;

  if (variables && variables.enabledActions) {
    const enabledActions = JSON.parse(variables.enabledActions);
    const actions = enabledActions.map(action => {
      let enabledActionComponent = <React.Fragment></React.Fragment>;

      if (action === 'unclaim') {
        enabledActionComponent = <Unclaim key={uuidv4()} task={task} />;
      } else if (action === 'claim') {
        enabledActionComponent = <Claim key={uuidv4()} task={task} />;
      } else if (action === 'complete') {
        enabledActionComponent = <Complete key={uuidv4()} task={task} />;
      }
      return enabledActionComponent;
    });

    const actionsDescription = () => {
      let actionsDescriptionComponent = <React.Fragment></React.Fragment>;

      if (actions && actions.length >= 1) {
        actionsDescriptionComponent = (
          <details className="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">Help with actions</span>
            </summary>
            <div className="govuk-details__text">
              <ul className="govuk-list govuk-list--bullet">
                <li>Claim: The task will be assigned to you</li>
                <li>
                  Unclaim: The task will be available for other members
                  in your team to action
                </li>
                <li>Complete: Finish work</li>
              </ul>
            </div>
          </details>
        );
      }
      return actionsDescriptionComponent;
    };

    actionComponent = (
      <div style={{ paddingTop: '50px' }}>
        <div className="btn-group btn-block" role="group">{actions}</div>
        {actionsDescription}
      </div>
    );
  }
  return actionComponent;
};

Actions.propTypes = {
  task: ImmutablePropTypes.map.isRequired,
  variables: PropTypes.objectOf(PropTypes.object),
};

Actions.defaultProps = {
  variables: {},
};

export default Actions;
