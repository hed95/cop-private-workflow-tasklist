import OnboardChecker from './OnboardChecker';
import moment from 'moment';
import Immutable from 'immutable';

describe("OnboardChecker", () => {
  const onboardChecker = new OnboardChecker();

  it('onboard-user for new user', () => {
    const staffDetails = null;

    const response = onboardChecker.onBoardCheck(staffDetails);
    expect(response.redirectPath).toEqual("/onboard-user");
  });

  it('noops-dashboard for inflight onboarding process', () => {
    const staffDetails = Immutable.fromJS({
      onboardprocessinstanceid: 'id'
    });
    const response = onboardChecker.onBoardCheck(staffDetails);
    expect(response.redirectPath).toEqual("/noop-dashboard");
  });

  it('authorized redirectPath if staff contains dateofleaving', () => {
    const staffDetails = Immutable.fromJS({
      dateofleaving: '01/01/2018'
    });
    const response = onboardChecker.onBoardCheck(staffDetails);
    expect(response.redirectPath).toEqual("/unauthorized");
  });

  it('expired man dec and inflight process', () => {
    const staffDetails = Immutable.fromJS({
      mandatorydeclarationnprocessinstanceid: 'id',
      mandeclastupdate: moment().year(2)
    });
    const response = onboardChecker.onBoardCheck(staffDetails);
    expect(response.redirectPath).toEqual("/noop-dashboard");
    expect(response.data.message).toEqual('Waiting for your manager to approve your mandatory declarations');
  });

  it('expired man dec', () => {
    const staffDetails = Immutable.fromJS({
      mandeclastupdate: moment().year(2)
    });
    const response = onboardChecker.onBoardCheck(staffDetails);
    expect(response.redirectPath).toEqual("/mandatory-declarations");
    expect(response.data.message).toEqual('You will need to complete a mandatory declaration before proceeding');
  });

  it('all checks passed', () => {
    const staffDetails = Immutable.fromJS({
      mandeclastupdate: moment().add(2, 'year'),
      staffid: 'staffid',
      onboardprocessinstanceid: null
    });
    const response = onboardChecker.onBoardCheck(staffDetails);
    expect(response.redirectPath).toEqual(null);
  });
});
