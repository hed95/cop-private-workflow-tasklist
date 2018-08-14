import React, {PropTypes} from 'react';
import {Route, Link, withRouter} from "react-router-dom";
import * as actions from "../actions";
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadingReports, reports} from "../selectors";
import Spinner from 'react-spinkit';

const uuidv4 = require('uuid/v4');


class ReportsPage extends React.Component {

    componentDidMount() {
        this.props.fetchReportsList();
    }


    render() {
        const {loadingReports, reports} = this.props;
        const pointerStyle = {cursor: 'pointer'};
        const items = [];
        if (reports) {
            reports.forEach((report) => {
                items.push(<tr key={uuidv4()} style={pointerStyle} onClick={() => {
                    this.props.history.push(`/report?url=${report.get('url')}`)
                }}>
                    <td>{report.get('name')}</td>
                    <td>{report.get('description')}</td>
                </tr>)
            });
        }

        return <div>
            <div className="grid-row" style={{width: '100%', height: '150px'}}>
                <div className="column-one-half">
                    <h2 className="heading-large">
                    <span
                        className="heading-secondary">Operational reports</span> {reports.size} reports
                    </h2>
                </div>

            </div>
            {loadingReports ? <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}><Spinner
                name="three-bounce" color="#005ea5"/></div> : <div>
                <table>
                    <tbody>
                    {items}
                    </tbody>
                </table>
            </div>}
        </div>
    }
}


ReportsPage.propTypes = {
    fetchReportsList: PropTypes.func.isRequired,
    loadingReports: PropTypes.bool
};


const mapStateToProps = createStructuredSelector({
    reports: reports,
    loadingReports: loadingReports,

});


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsPage));