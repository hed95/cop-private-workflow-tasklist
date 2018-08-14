import React, {PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../../core/shift/actions";
import {endingShift, hasActiveShift} from "../../../core/shift/selectors";

class DashboardTitle extends React.Component {

    shift(e) {
        e.preventDefault();
        this.props.history.replace("/shift");
    }

    endShift(e) {
        e.preventDefault();
        this.props.endShift();
    }


    componentWillReceiveProps(nextProps) {
        if (!nextProps.hasActiveShift) {
            this.props.history.replace("/dashboard");
        }
    }


    render() {

        return <div className="grid-row" style={{width: '100%', height: '200px'}}>
            <div className="column-one-half">
                <h2 className="heading-large">
                    <span
                        className="heading-secondary">Operational dashboard</span>{this.props.kc.tokenParsed.given_name} {this.props.kc.tokenParsed.family_name}
                </h2>
            </div>

            {this.props.hasActiveShift ?
                <div className="column-one-half" style={{margin: '7% auto', textAlign: 'right'}}>
                    <div>
                        <input className="btn btn-default" style={{margin: '0'}} type="submit" value="Edit shift"
                               onClick={this.shift.bind(this)} disabled={this.props.endingShift}/> {' '}
                        <input className="btn btn-primary" style={{margin: '0'}} type="submit" value="End shift"
                               onClick={this.endShift.bind(this)} disabled={this.props.endingShift}/>
                    </div>

                </div> : <div className="column-one-half" style={{margin: '7% auto', textAlign: 'right'}}>
                    <input className="btn btn-primary" type="submit" value="Start shift"
                           onClick={this.shift.bind(this)} />
                </div>}

        </div>
    }
}


DashboardTitle.propTypes = {
    endShift: PropTypes.func.isRequired
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
    return {
        kc: state.keycloak,
        hasActiveShift: hasActiveShift(state),
        endingShift: endingShift(state)
    }
}, mapDispatchToProps)(DashboardTitle))