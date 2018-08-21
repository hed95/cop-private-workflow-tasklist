import React from "react";
import {withRouter} from "react-router";

class ProceduresDashboardPanel extends React.Component {


    procedures(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: "/procedures", state: {
                shiftPresent: this.props.hasActiveShift
            }
        });
    }

    render() {
        return <li className="__card column-one-third" id="proceduresPanel">
            <a href="#" onClick={this.procedures.bind(this)} className="card__body">
                <span className="bold-large">procedures</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Operational procedures</span>
            </div>
        </li>
    }
}

export default withRouter(ProceduresDashboardPanel)