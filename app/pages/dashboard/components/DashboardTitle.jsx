import React  from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../core/shift/actions";
import {endingShift, hasActiveShift} from "../../../core/shift/selectors";
import "./DashboardTitle.css";
class DashboardTitle extends React.Component {

    constructor(props) {
        super(props);
        this.endShift = this.endShift.bind(this);
        this.viewShift = this.viewShift.bind(this);
    }

    viewShift(e) {
        e.preventDefault();
        this.props.history.replace("/shift");
    }

    endShift(e) {
        e.preventDefault();
        this.props.endShift();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.hasActiveShift) {
            window.location.reload();
        }
    }

    render() {
        return <div className="govuk-grid-row" style={{paddingTop: '10px'}}>
            <div className="govuk-grid-column-one-half">

                <h1 className="govuk-heading-l">
                    <span className="govuk-caption-l">{this.props.kc.tokenParsed.given_name} {this.props.kc.tokenParsed.family_name}</span>
                    Operational dashboard
                </h1>
            </div>

            {this.props.hasActiveShift ?
                <div className="govuk-grid-column-one-half" style={{margin: '2% auto', textAlign: 'right'}}>
                    <div className="shift-button-ul">
                        <ul>
                            <li><button id="editShift" className="govuk-button govuk-button--secondaryy" style={{margin: '0'}} type="submit"
                                 onClick={this.viewShift} disabled={this.props.endingShift}>Edit shift</button></li>
                            <li>
                                <button id="endShift" className="govuk-button" type="submit"
                                        onClick={this.endShift} disabled={this.props.endingShift} data-prevent-double-click="true">End shift</button></li>
                        </ul>
                    </div>

                </div> : <div className="govuk-grid-column-one-half" style={{margin: '7% auto', textAlign: 'right'}}>
                    <button id="startShift" className="govuk-button" type="submit"
                            onClick={this.viewShift}>Start shift</button>
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
