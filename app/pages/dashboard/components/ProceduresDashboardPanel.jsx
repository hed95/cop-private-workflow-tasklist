import React from "react";
import {withRouter} from "react-router";
import AppConstants from "../../../common/AppConstants";

export class ProceduresDashboardPanel extends React.Component {


    procedures(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.PROCEDURES_PATH, state: {
                shiftPresent: this.props.hasActiveShift
            }
        });
    }

    render() {
        return <li className="__card column-one-third" id="proceduresPanel">
            <a href="#" onClick={this.procedures.bind(this)} className="card__body" id="proceduresPageLink">
                <span className="bold-large">procedures</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Operational procedures</span>
            </div>
        </li>
    }
}

export default withRouter(ProceduresDashboardPanel)
