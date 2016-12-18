// Helper file to create new unique URLs (brews)
const brews = require('./brews');
const xkcdPassword = require('xkcd-password');

const OPTIONS = {
  numWords: 4,
  minLength: 3,
  maxLength: 20
};

const tokenGenerator = new xkcdPassword();
tokenGenerator.initWithWordList(brews);

// Returns a promise (need to use .then after invoking generateBrew())
module.exports = () => {
  return tokenGenerator.generate(OPTIONS).then((parts) => {
    return parts.join('-');
  });
}
