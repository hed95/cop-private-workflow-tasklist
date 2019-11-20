import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hasActiveShift, isFetchingShift, shift} from './selectors';
import * as actions from './actions';
import {createStructuredSelector} from 'reselect';
import {Redirect, withRouter} from 'react-router';
import ErrorHandlingComponent from '../error/component/ErrorHandlingComponent';
import * as errorActions from '../error/actions';
import DataSpinner from '../components/DataSpinner';
import secureLocalStorage from "../../common/security/SecureLocalStorage";
import moment from 'moment';
import Immutable from 'immutable';

const uuidv4 = require('uuid/v4');

export default function (ComposedComponent) {
    class withShiftCheck extends React.Component {
        constructor(props) {
            super(props);
            this.secureLocalStorage = secureLocalStorage;
        }

        componentDidMount() {
            this.props.resetErrors();
            let shiftFromLocalStorage = this.secureLocalStorage.get("shift");
            if (!shiftFromLocalStorage) {
                this.props.fetchActiveShift();
            }
            shiftFromLocalStorage = Immutable.fromJS(shiftFromLocalStorage);
            if (shiftFromLocalStorage && this.shiftValid(shiftFromLocalStorage)) {
                this.props.setHasActiveShift(true);
            } else {
                this.props.setHasActiveShift(false);
                this.secureLocalStorage.remove("shift");
            }
        }


        componentDidUpdate(prevProps, prevState, snapshot) {
            if (!this.props.isFetchingShift && this.props.shift && this.shiftValid(this.props.shift)) {
                this.props.setHasActiveShift(true);
                this.secureLocalStorage.set("shift", this.props.shift);
            } else {
                this.props.history.replace('/shift')
            }
        }

        shiftValid(shift) {
            if (shift) {
                const endDateTime = moment(shift.get('enddatetime'));
                return moment().diff(endDateTime) < 0
            } else {
                return false;
            }
        }

        render() {
            const {hasActiveShift, isFetchingShift} = this.props;
            if (isFetchingShift) {
                return <DataSpinner message={`Checking if you have an active shift`}/>;
            } else {
                if (hasActiveShift) {
                    return <ErrorHandlingComponent><BackButton {...this.props}><ComposedComponent {...this.props}
                                                                                                  key={uuidv4()}/></BackButton></ErrorHandlingComponent>;
                } else {
                    return <Redirect to={"/shift"}/>;
                }
            }
        }

    }

    class BackButton extends React.Component {
        render() {
            if (this.props.location.pathname !== '/dashboard') {
                return <div>
                    <a href="#" style={{textDecoration: 'none'}} className="govuk-back-link govuk-!-font-size-19"
                       onClick={() => this.props.history.replace('/dashboard')}>Back to
                        dashboard
                    </a>
                    {this.props.children}
                </div>;
            }
            return <div>{this.props.children}</div>;
        }
    }

    withShiftCheck.propTypes = {
        fetchActiveShift: PropTypes.func.isRequired,
        setHasActiveShift: PropTypes.func.isRequired,
        resetErrors: PropTypes.func.isRequired,
        isFetchingShift: PropTypes.bool,
        hasActiveShift: PropTypes.bool
    };

    const mapStateToProps = createStructuredSelector({
        hasActiveShift: hasActiveShift,
        isFetchingShift: isFetchingShift,
        shift: shift
    });

    const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, actions, errorActions), dispatch);

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(withShiftCheck));
}

