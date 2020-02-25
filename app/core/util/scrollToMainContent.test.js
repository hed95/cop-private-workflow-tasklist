import { scrollToMainContent } from './scrollToMainContent';

describe('scrollToMainContent', () => {
  const preventDefault = jest.fn();
  const scrollIntoView = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls preventDefault', () => {
    scrollToMainContent({ preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('fires scrollIntoView if div found', () => {
    document.body.innerHTML = '<div id="main-content">Hello!</div>';
    scrollToMainContent({ preventDefault });
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('does not fire scrollIntoView if div not found', () => {
    document.body.innerHTML = '<div>Hello!</div>';
    scrollToMainContent({ preventDefault });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
