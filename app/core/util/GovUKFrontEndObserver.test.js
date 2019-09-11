import GovUKFrontEndObserver from 'core/util/GovUKFrontEndObserver';

describe('GovUKFrontEndObserver utility', () => {

  let observer;

  beforeEach(() => {
    observer = new GovUKFrontEndObserver(document.body);
  });

  it('should create and return an observer', () => {
    expect(observer).toBeDefined();
  });

  it('should create an internal MutationObserver', () => {
    observer.create();
    expect(observer.observer).toBeDefined();
  });

  it('should destroy its observer', () => {
    observer.create();
    observer.destroy();
    expect(observer.observer).toBeNull();
  });

});
