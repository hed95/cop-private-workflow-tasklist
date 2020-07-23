export default class AppConstants {
  // Names
  static APP_NAME = 'Central Operations Platform';

  // App paths
  static CALENDAR_PATH = '/calendar';

  static CASES_PATH = '/cases';

  static DASHBOARD_PATH = '/dashboard';

  static FORMS_PATH = '/forms';

  static MESSAGES_PATH = '/messages';

  static MY_PROFILE_PATH = 'submit-a-form/edit-your-profile';

  static ONBOARD_USER_PATH = '/onboard-user';

  static PROCEDURE_DIAGRAM_PATH = '/procedure-diagram';

  static REPORT_PATH = '/report';

  static REPORTS_PATH = '/reports';

  static SHIFT_PATH = '/shift';

  static SUBMIT_A_FORM = '/submit-a-form';

  static SUPPORT_PATH = 'https://support.cop.homeoffice.gov.uk/servicedesk/customer/portal/3'

  static TASK_PATH = '/task';

  static YOUR_GROUP_TASKS_PATH = '/your-group-tasks';

  static YOUR_TASKS_PATH = '/your-tasks';

  // Priorities
  // -- LOWER_LIMIT states the lowest priority number a task can have for it to be classified as medium or high
  // -- UPPER_LIMIT states the highest priority number a task can have for it to be classified as low
  // -- These are used both for creating bandings in priority.js and for setting the value of the select fields where a user can switch a priority
  static HIGH_PRIORITY_LOWER_LIMIT = 150;

  static MEDIUM_PRIORITY_LOWER_LIMIT = 100;

  static LOW_PRIORITY_UPPER_LIMIT = 50;

  static HIGH_PRIORITY_LABEL = 'High';

  static MEDIUM_PRIORITY_LABEL = 'Medium';

  static LOW_PRIORITY_LABEL = 'Low';

  // Sizes
  static MOBILE_WIDTH = 640;

  // Timers
  static REFRESH_TIMEOUT = 300000;

}
