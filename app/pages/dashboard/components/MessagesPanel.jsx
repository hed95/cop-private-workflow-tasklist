import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { isFetchingMessageCounts, messageCounts } from '../selectors';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import * as logActions from '../../../core/error/actions';
import { connect } from 'react-redux';
import AppConstants from '../../../common/AppConstants';
import PubSub from 'pubsub-js';

export class MessagesPanel extends React.Component {

    constructor(props) {
        super(props);
        this.messages = this.messages.bind(this);

    }

    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.token = PubSub.subscribe('refreshCount', (msg, data) => {
              const path = this.props.history.location.pathname;
              const user = this.props.kc.tokenParsed.email;
              this.props.log([{
                level: 'info',
                user: user,
                path: path,
                message: 'refreshing message count',
              }]);
              this.props.fetchMessageCounts();
            });
            this.props.fetchMessageCounts();
        } else {
            this.props.setDefaultCounts();
        }

    }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.fetchMessageCounts) {
      const path = this.props.history.location.pathname;
      const user = this.props.kc.tokenParsed.email;
      const taskCounts = this.props.messageCounts.toJSON();
      const logStatements = [{
        level: 'info',
        user: user,
        path: path,
        message: 'message count loaded',
        taskCounts
      }];
      this.props.log(logStatements);
    }
  }

    componentWillUnmount() {
        if (this.token) {
            PubSub.unsubscribe(this.token);
        }
    }

    messages(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.MESSAGES_PATH,
            shiftPresent: this.props.hasActiveShift
        });
    }
    render() {
        const {isFetchingMessageCounts, messageCounts} = this.props;

        return  <li className="__card column-one-third" id="messagesPanel">
            <a href="#" onClick={this.messages} className="card__body" id="messagesPageLink">
                {
                    isFetchingMessageCounts ?   <span
                    className="bold-small">Loading</span>: <span
                    className="bold-xlarge">{messageCounts}</span>
                }
                <span className="bold-small">messages</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Your messages/notifications</span>
            </div>
        </li>

    }
}

MessagesPanel.propTypes = {
  log: PropTypes.func,
    fetchMessageCounts: PropTypes.func.isRequired,
    messageCounts: PropTypes.number,
    isFetchingMessageCounts: PropTypes.bool
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign(actions, logActions), dispatch);

export default connect((state) => {
  return {
    messageCounts: messageCounts(state),
    isFetchingMessageCounts: isFetchingMessageCounts(state),
    kc: state.keycloak
  }
}, mapDispatchToProps)(withRouter(MessagesPanel));
