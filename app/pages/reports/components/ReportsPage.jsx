import React from 'react';
import { Route, Link } from "react-router-dom";

class ReportsPage extends React.Component {

    render() {
        return <div>
            <h3 className="heading-medium">Reports Listing</h3>
            <ul className="list">
                <li> <Link to={`/reports/interventions`}>Interventions</Link></li>
            </ul>
        </div>
    }
}

export default ReportsPage;