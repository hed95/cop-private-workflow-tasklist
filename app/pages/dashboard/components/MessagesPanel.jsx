import React, {PropTypes} from 'react';
import {withRouter} from "react-router";
import ImmutablePropTypes from "react-immutable-proptypes";
import {createStructuredSelector} from "reselect";
import {isFetchingMessageCounts, messageCounts} from "../selectors";
import {bindActionCreators} from "redux";
import * as actions from "../actions";
import {connect} from "react-redux";
import AppConstants from "../../../common/AppConstants";
import PubSub from "pubsub-js";

class MessagesPanel extends React.Component {

    constructor(props) {
        super(props);
        this.messages = this.messages.bind(this);
        PubSub.subscribe('refreshCount', (msg, data) => {
            console.log("Refreshing messages count...");
            this.props.fetchTaskCounts();
        });
    }

    componentDidMount() {
        if (this.props.hasActiveShift) {
            this.props.fetchMessageCounts();
        } else {
            this.props.setDefaultCounts();
        }

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.hasActiveShift !== nextProps.hasActiveShift && nextProps.hasActiveShift) {
            this.props.fetchMessageCounts();
        }
    }

    componentWillUnmount() {
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
            <a href="#" onClick={this.messages} className="card__body">
                <span className="bold-xlarge">{isFetchingMessageCounts? 0: messageCounts.getIn(['page', 'totalElements'])}</span>
                <span className="bold-small">messages</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Your messages/notifications</span>
            </div>
        </li>

    }
}

MessagesPanel.propTypes = {
    fetchMessageCounts: PropTypes.func.isRequired,
    messageCounts: ImmutablePropTypes.map,
    isFetchingMessageCounts: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    messageCounts: messageCounts,
    isFetchingMessageCounts: isFetchingMessageCounts
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagesPanel));