import { detect } from 'detect-browser';

export default (config, agentString) => {
  if (!config || !(typeof config === 'string' && config.length)) {
    throw new Error(
      "detectBrowser expects a comma-delimited config string—e.g. 'Chrome-76.0,Edge-17.17134'",
    );
  }

  const detectedBrowser = detect(agentString);
  const userBrowser = {
    name: detectedBrowser.name,
    version: detectedBrowser.version.split('.'),
  };
  const browsers = config.split(',');
  let isSupported = true;

  browsers.forEach(browser => {
    const name = browser.split('-')[0];
    const version = browser.split('-')[1].split('.');
    if (
      (userBrowser.name.match(new RegExp(name, 'i')) &&
        userBrowser.version[0] < version[0]) ||
      (userBrowser.version[0] === version[0] &&
        userBrowser.version[1] < version[1])
    ) {
      isSupported = false;
    }
  });

  return isSupported;
};
