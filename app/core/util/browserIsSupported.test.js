import browserIsSupported from './browserIsSupported';

describe('browserIsSupported', () => {
  // Node's jsdom is not expected among user agents...
  const config = 'Chrome-76.0,Edge-17.17134';
  const chrome =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.5.3987.132 Safari/537.36';
  const edge =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362';
  const firefox =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0';
  it('throws error if config is not a string', () => {
    const errorMessage = `detectBrowser expects a comma-delimited config string—e.g. '${config}'`;
    expect(() => browserIsSupported()).toThrowError(new Error(errorMessage));
    expect(() => browserIsSupported({}, edge)).toThrow(new Error(errorMessage));
    expect(() => browserIsSupported('', edge)).toThrow(new Error(errorMessage));
    expect(() => browserIsSupported(config, edge)).not.toThrowError();
  });

  it('automatically reports supported if user agent is not found in config at all', () => {
    expect(browserIsSupported(config, firefox)).toBe(true);
  });

  it('reports not supported if user agent major version < config', () => {
    expect(browserIsSupported('Chrome-76.0,Edge-79.0', edge)).toBe(
      false,
    );
  });

  it('reports not supported if user agent major version === config but user agent minor version < config', () => {
    expect(
      browserIsSupported('Chrome-80.7,Edge-17.17134', chrome),
    ).toBe(false);
  });

  it('reports supported if user agent major version === config and user agent minor version > config', () => {
    expect(
      browserIsSupported('Chrome-76.0,Edge-17.17135', edge),
    ).toBe(true);
  });

  it('reports supported if user agent major version === config and user agent minor version === config', () => {
    expect(
      browserIsSupported('Chrome-76.0,Edge-17.17134', edge),
    ).toBe(true);
  });

  it('reports supported if user agent major version > config and user agent minor version === config', () => {
    expect(
      browserIsSupported('Chrome-76.5,Edge-17.17134', chrome),
    ).toBe(true);
  });

  it('reports supported if user agent major version > config and user agent minor version < config', () => {
    expect(
      browserIsSupported('Chrome-76.0,Edge-18.17133', edge),
    ).toBe(true);
  });

  it('reports supported if user agent major version > config and user agent minor version > config', () => {
    expect(browserIsSupported(config, chrome)).toBe(true);
  });
});
