import GovUKFrontEndObserver from 'core/util/GovUKFrontEndObserver';

describe('GovUKFrontEndObserver utility', () => {

  let govUKObserver;

  beforeEach(() => {
    govUKObserver = new GovUKFrontEndObserver(document.body);
  });

  it('should create a node property', () => {
    expect(govUKObserver.node).toBeInstanceOf(HTMLElement);
  });

  it('should return an observer', () => {
    expect(govUKObserver).toBeInstanceOf(GovUKFrontEndObserver);
  });

  it('should create an internal MutationObserver', () => {
    govUKObserver.create();
    expect(govUKObserver.observer).toBeInstanceOf(MutationObserver);
    expect(govUKObserver.observer.observe).toHaveBeenCalledTimes(1);
  });

  it('should disconnect its observer', () => {
    govUKObserver.create();
    govUKObserver.destroy();
    expect(govUKObserver.observer.disconnect).toHaveBeenCalledTimes(1);
  });

});
