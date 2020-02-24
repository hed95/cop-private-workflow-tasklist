export const scrollToMainContent = e => {
  e.preventDefault();
  const div = document.getElementById('main-content');
  div && div.scrollIntoView({ behavior: 'smooth' });
};

export default scrollToMainContent;
