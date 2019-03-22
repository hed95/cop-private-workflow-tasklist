import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  activeShiftSuccess,
  failedToCreateShift,
  hasActiveShift,
  isFetchingShift,
  isFetchingStaffDetails,
  loadingShiftForm,
  shift,
  shiftForm,
  staffDetails,
  submittingActiveShift
} from '../../../core/shift/selectors';
import { Form } from 'react-formio';
import * as actions from '../../../core/shift/actions';
import moment from 'moment';
import Loader from 'react-loader-advanced';
import DataSpinner from '../../../core/components/DataSpinner';
import ErrorPanel from '../../../core/error/component/ErrorPanel';

export class ShiftPage extends React.Component {

  componentDidMount() {
    this.props.fetchActiveShift();
    this.props.fetchShiftForm();
    this.props.fetchStaffDetails();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.submittingActiveShift !== prevProps.submittingActiveShift && !this.props.submittingActiveShift) {
      if (this.form && this.form.formio) {
        if (this.props.activeShiftSuccess) {
          this.form.formio.emit('submitDone');
          this.props.history.replace('/dashboard');
        } else {
          this.form.formio.emit('error');
          this.form.formio.emit('change', this.form.formio.submission);
        }
      }

    }

  }


  render() {
    const {
      isFetchingShift,
      submittingActiveShift,
      failedToCreateShift,
      hasActiveShift,
      isFetchingStaffDetails,
      loadingShiftForm

    } = this.props;

    if (loadingShiftForm || isFetchingStaffDetails || isFetchingShift) {
      return  <DataSpinner message="Loading your shift details"/>;
    }

    const spinner = <DataSpinner message="Submitting your shift details..."/>;
    return <div style={{ paddingTop: '20px' }}>

      <Loader show={submittingActiveShift} message={spinner}
              hideContentOnLoad={submittingActiveShift}
              foregroundStyle={{ color: 'black' }}
              backgroundStyle={{ backgroundColor: 'white' }}>
        <div className="grid-row">
          <div className="column-full" id="shiftWizardForm">
            {!isFetchingShift && !hasActiveShift && !failedToCreateShift?
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                <div className="notice">
                  <i className="icon icon-important">
                    <span className="visually-hidden">Warning</span>
                  </i>
                  <strong className="bold-medium">
                    Please start your shift before proceeding
                  </strong>
                </div>
              </div> : null}
            <ShiftForm props={this.props} formReference={(form) => this.form = form } submit={(shiftForm, submission) => {
              this.props.submit(shiftForm._id, submission.data);
            }}/>
          </div>
        </div>
      </Loader>
    </div>;

  }

}

const ShiftForm = ({props, formReference, submit}) => {
  let cancelButtonAdded;
  const resetCancelButton = () => {
    if (cancelButtonAdded === true) {
      cancelButtonAdded = false;
    }
  };
  const { shiftForm, shift, loadingShiftForm, isFetchingShift, isFetchingStaffDetails, staffDetails } = props;
  const onRender = () => {
    const hasCancelButton = $('.list-inline ul li:contains("Cancel")').length;
    if (hasCancelButton === 0 && cancelButtonAdded !== true) {
      $('.list-inline li:eq(0)')
        .before('<li class="list-inline-item"><button id="cancelButton" class="btn btn-default btn-secondary btn-wizard-nav-cancel">Cancel</button></li>');
      $('#cancelButton')
        .bind('click', (e) => {
          e.preventDefault();
          props.history.replace('/dashboard');
        });
      cancelButtonAdded = true;
    }
  };

  if (isFetchingShift && loadingShiftForm && isFetchingStaffDetails) {
    return <DataSpinner message="Loading shift details..."/>;
  } else {
    const options = {
      noAlerts: true,
      language: 'en',
      buttonSettings: {
        showCancel: false
      },
      i18n: {
        en: {
          cancel: 'Cancel',
          previous: 'Back',
          next: 'Next'
        }
      },
    };
    if (shiftForm) {
      if (shift) {
        const shiftSubmission = {
          data: {
            shiftminutes: shift.get('shiftminutes'),
            shifthours: shift.get('shifthours'),
            startdatetime: moment.utc(shift.get('startdatetime')),
            teamid: shift.get('teamid'),
            locationid: shift.get('locationid'),
            phone: shift.get('phone')
          }
        };
        options.i18n.en.submit = 'Amend shift';

        return <Form form={shiftForm} submission={shiftSubmission} options={options}
                     ref={(form) => {
                       formReference(form)
                     }}
                     onNextPage={() => {
                       resetCancelButton();
                     }}
                     onPrevPage={() => {
                       resetCancelButton();
                     }}
                     onRender={() => onRender()}
                     onSubmit={(submission) => submit(shiftForm, submission)}
        />;
      } else {
        options.i18n.en.submit = 'Start shift';
        if (staffDetails) {
          const shiftSubmission = {
            data: {
              shiftminutes: 0,
              shifthours: 8,
              startdatetime: moment.utc(moment()),
              teamid: staffDetails.get('defaultteamid'),
              locationid: staffDetails.get('defaultlocationid'),
              phone: staffDetails.get('phone')
            }
          };
          return <Form form={shiftForm} submission={shiftSubmission} options={options}
                       ref={(form) => {
                         formReference(form)
                       }}
                       onNextPage={() => {
                         resetCancelButton();
                       }}
                       onPrevPage={() => {
                         resetCancelButton();
                       }}
                       onRender={() => onRender()}
                       onSubmit={(submission) => submit(shiftForm, submission)} />
        }
        return <Form form={shiftForm}
                     ref={(form) => formReference(form)}
                     onRender={() => onRender()}
                     onNextPage={() => {
                       resetCancelButton();
                     }}
                     onPrevPage={() => {
                       resetCancelButton();
                     }}
                     options={options}
                     onSubmit={(submission) => submit(shiftForm, submission)} />
      }
    } else {
      return <div/>;
    }
  }

};


ShiftPage.propTypes = {
  fetchShiftForm: PropTypes.func.isRequired,
  fetchActiveShift: PropTypes.func.isRequired,
  fetchStaffDetails: PropTypes.func.isRequired,
  isFetchingShift: PropTypes.bool,
  hasActiveShift: PropTypes.bool,
  isFetchingStaffDetails: PropTypes.bool,
  shift: ImmutablePropTypes.map,
  staffDetails: ImmutablePropTypes.map,
  unauthorised: PropTypes.bool
};


const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
  return {
    hasActiveShift: hasActiveShift(state),
    isFetchingShift: isFetchingShift(state),
    submittingActiveShift: submittingActiveShift(state),
    activeShiftSuccess: activeShiftSuccess(state),
    shift: shift(state),
    failedToCreateShift: failedToCreateShift(state),
    shiftForm: shiftForm(state),
    loadingShiftForm: loadingShiftForm(state),
    staffDetails: staffDetails(state),
    isFetchingStaffDetails: isFetchingStaffDetails(state)

  };
}, mapDispatchToProps)(ShiftPage));
