import React from 'react';
import {withRouter} from "react-router";
import AppConstants from "../../../common/AppConstants";

export class CalendarDashboardPanel extends React.Component {


    calendar(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: AppConstants.CALENDAR_PATH,
            shiftPresent: this.props.hasActiveShift
        });
    }
    render() {
        return <li className="__card govuk-grid-column-one-third" id="calendarPanel" style={{marginBottom: '30px'}}>
            <a href="#" onClick={this.calendar.bind(this)} className="card__body" id="calendarPageLink">
                <span className="govuk-!-font-size-36 govuk-!-font-weight-bold">calendar</span>
            </a>
            <div className="card__footer">
                <span className="govuk-!-font-size-19">Operational calendar</span>
            </div>
        </li>
    }
}

export default withRouter(CalendarDashboardPanel);
