export const priority = priority => {
  let result = null;

  if (priority <= 50) { result = 'Low' }
  else if (priority > 50 && priority < 150) { result = 'Medium' }
  else if (priority >= 150) { result = 'High' }
  else { result = 'High' }
  return result;
};