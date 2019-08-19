export default class OnboardChecker {
  onBoardCheck(staffDetails, location) {
    const nonExistentStaff = new NonExistentStaff();
    const onboardingProcessInFlight = new OnboardingProcessInflight();
    const staffLeft = new StaffLeft();
    const checksPassed = new ChecksPassed(location);

    nonExistentStaff.setNext(onboardingProcessInFlight);
    onboardingProcessInFlight.setNext(staffLeft);
    staffLeft.setNext(checksPassed);
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
          message: 'You will need to follow the below onboarding process',
        },
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
    if (staffDetails.get('onboardprocessinstanceid')) {
      return {
        redirectPath: '/noop-dashboard',
        data: {
          submission: true,
          type: 'warning',
          autoDismiss: false,
          message: 'Creating your system access, please refresh',
        },
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
    if (staffDetails.get('dateofleaving')) {
      return {
        redirectPath: '/unauthorized',
      };
    }
    return this.next.performCheck(staffDetails);
  }
}

class ChecksPassed {
  constructor(location) {
    this.location = location;
  }

  performCheck(staffDetails) {
    if (this.location === '/onboard-user') {
      return {
        redirectPath: '/dashboard',
        data: {
          submission: true,
          type: 'warning',
          autoDismiss: true,
          message: 'You are already onboarded to the platform',
        },
      };
    }
    return {
      redirectPath: null,
    };
  }
}
