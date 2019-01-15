import moment from 'moment';

const isOverYearOld = (mandatoryDeclarationDate) => {
  const year = moment()
    .diff(mandatoryDeclarationDate, 'years', true);
  return year > 1;
};
export default class OnboardChecker {

  onBoardCheck(staffDetails) {
    const nonExistentStaff = new NonExistentStaff();
    const onboardingProcessInFlight = new OnboardingProcessInflight();
    const staffLeft = new StaffLeft();
    const expiredManDecAndInflightProcess = new ExpiredManDecAndInflightProcess();
    const expiredMandatoryDeclaration = new ExpiredMandatoryDeclaration();
    const checksPassed = new ChecksPassed();

    nonExistentStaff.setNext(onboardingProcessInFlight);
    onboardingProcessInFlight.setNext(staffLeft);
    staffLeft.setNext(expiredManDecAndInflightProcess);
    expiredManDecAndInflightProcess.setNext(expiredMandatoryDeclaration);
    expiredMandatoryDeclaration.setNext(checksPassed);
    return nonExistentStaff.performCheck(staffDetails);
  }
}

class NonExistentStaff {
  constructor() {
    this.next = null;
  }

  setNext(fn) {
    this.next = fn;
  }

  performCheck(staffDetails) {
    if (!staffDetails) {
      return {
        redirectPath: '/onboard-user',
        data: {
          submission: true,
          type: 'warning',
          autoDismiss: true,
          message: `You will need to follow the below onboarding process`
        }
      };
    }
    return this.next.performCheck(staffDetails);
  }
}

class OnboardingProcessInflight {
  constructor() {
    this.next = null;
  }

  setNext(fn) {
    this.next = fn;
  }

  performCheck(staffDetails) {
    if (staffDetails.onboardingprocessinstanceid) {
      return {
        redirectPath: '/noop-dashboard',
        data: {
          submission: true,
          type: 'warning',
          autoDismiss: false,
          message: `Waiting for your manager to approve your onboarding request`
        }
      };
    }
    return this.next.performCheck(staffDetails);
  }
}

class StaffLeft {
  constructor() {
    this.next = null;
  }

  setNext(fn) {
    this.next = fn;
  }

  performCheck(staffDetails) {
    if (staffDetails.dateofleaving) {
      return {
        redirectPath: '/unauthorized'
      };
    }
    return this.next.performCheck(staffDetails);
  }
}

class ExpiredManDecAndInflightProcess {
  constructor() {
    this.next = null;
  }

  setNext(fn) {
    this.next = fn;
  }

  performCheck(staffDetails) {
    const mandatoryDeclarationDate = staffDetails.get('mandeclastupdate');
    const expiredMandatoryDeclaration = !mandatoryDeclarationDate || isOverYearOld(mandatoryDeclarationDate);

    if (expiredMandatoryDeclaration && staffDetails.get('mandatorydeclarationnprocessinstanceid')) {
      return {
        redirectPath: '/noop-dashboard',
        data: {
          submission: true,
          type: 'warning',
          autoDismiss: false,
          message: `Waiting for your manager to approve your mandatory declarations`
        }
      };
    }
    return this.next.performCheck(staffDetails);
  }
}

class ExpiredMandatoryDeclaration {
  constructor() {
    this.next = null;
  }

  setNext(fn) {
    this.next = fn;
  }

  performCheck(staffDetails) {
    const mandatoryDeclarationDate = staffDetails.get('mandeclastupdate');
    const expiredMandatoryDeclaration = !mandatoryDeclarationDate || isOverYearOld(mandatoryDeclarationDate);

    if (expiredMandatoryDeclaration) {
      return {
        redirectPath: '/mandatory-declarations',
        data: {
          submission: true,
          type: 'warning',
          autoDismiss: true,
          message: `You will need to complete a mandatory declaration before proceeding`
        }
      };
    }
    return this.next.performCheck(staffDetails);
  }
}

class ChecksPassed {

  performCheck(staffDetails) {
    return {
      redirectPath: null
    };
  };
}

