import React from 'react';
import {withRouter} from "react-router";

class CalendarDashboardPanel extends React.Component {


    calendar() {
        this.props.history.replace({
            pathname: "/calendar"
        });
    }
    render() {
        return <li className="__card column-one-third">
            <a href="#" onClick={this.calendar.bind(this)} className="card__body">
                <span className="bold-large">calendar</span>
            </a>
            <div className="card__footer">
                <span className="font-small">Operational calendar</span>
            </div>
        </li>
    }
}

export default withRouter(CalendarDashboardPanel);