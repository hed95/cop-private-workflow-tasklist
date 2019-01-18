import React from 'react';
import { withRouter } from 'react-router';
import DashboardTitle from './DashboardTitle';
import DashboardPanel from './DashboardPanel';
import { bindActionCreators } from 'redux';
import * as actions from '../../../core/shift/actions';
import { connect } from 'react-redux';
import ErrorPanel from '../../../core/error/component/ErrorPanel';
import * as errorActions from '../../../core/error/actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

export class DashboardPage extends React.Component {

    componentDidMount() {
        this.props.resetErrors();
    }

    render() {
        return <div id="dashboardContent">
            <ErrorPanel {...this.props} />
            <DashboardTitle {...this.props} />
            <DashboardPanel {...this.props}/>
        </div>

    }
}

DashboardPage.propTypes = {
    shift: ImmutablePropTypes.map
};


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, actions, errorActions), dispatch);

export default withRouter(connect((state) => {
    return {
        shift: shift(state)
    }
}, mapDispatchToProps)(DashboardPage))
