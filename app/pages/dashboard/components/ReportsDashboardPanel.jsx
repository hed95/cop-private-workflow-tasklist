import React from "react";
import {withRouter} from "react-router";

class ReportsDashboardPanel extends React.Component {


    reports(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: "/reports"
        });
    }

    render() {
        return <li className="__card column-one-third" id="reportsPanel">
            <a href="#" onClick={this.reports.bind(this)} className="card__body">
                <span className="bold-large">reports</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Operational reports</span>
            </div>
        </li>
    }
}

export default withRouter(ReportsDashboardPanel);