const {
  PROTOCOL,
  EXT_DOMAIN,
  FORMIO_SERVER_NAME,
  OPERATIONAL_POSTGREST_NAME,
  REPORTING_SERVER_NAME,
  TRANSLATION_SERVER_NAME,
  WORKFLOW_SERVER_NAME,
} = process.env;

const config = {
  services: {
    operationalData: {
      url: `${PROTOCOL}${OPERATIONAL_POSTGREST_NAME}.${EXT_DOMAIN}`,
    },
    workflow: {
      url: `${PROTOCOL}${WORKFLOW_SERVER_NAME}.${EXT_DOMAIN}`,
    },
    translation: {
      url: `${PROTOCOL}${TRANSLATION_SERVER_NAME}.${EXT_DOMAIN}`,
    },
    form: {
      url: `${PROTOCOL}${FORMIO_SERVER_NAME}.${EXT_DOMAIN}`,
    },
    report: {
      url: `${PROTOCOL}${REPORTING_SERVER_NAME}.${EXT_DOMAIN}`,
    },
  },
};

export default config;
