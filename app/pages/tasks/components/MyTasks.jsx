import React, {PropTypes} from 'react';
import ImmutablePropTypes from "react-immutable-proptypes";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import * as actions from "../actions";
import {myTasks} from "../selectors";

class MyTasks extends React.Component {

    componentDidMount() {
        this.props.fetchTasksAssignedToMe("/api/workflow/tasks");
    }

    render() {
        const {myTasks} = this.props;

        return <div>
            <div className="data">
                <span className="data-item bold-xlarge">{myTasks.get('total')}</span>
                    <span className="data-item bold-small">Assigned</span>
            </div>
        </div>
    }
}

MyTasks.propTypes = {
    fetchTasksAssignedToMe: PropTypes.func.isRequired,
    myTasks: ImmutablePropTypes.map
};

const mapStateToProps = createStructuredSelector({
    myTasks: myTasks
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);
