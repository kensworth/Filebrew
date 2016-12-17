// Helper file to create new unique URLs (brews)
import brews from './brews';
import xkcdPassword from 'xkcd-password';

const OPTIONS = {
  numWords: 4,
  minLength: 5,
  maxLength: 20
};

const tokenGenerator = new xkcdPassword();
tokenGenerator.initWithWordList(brews);

// Returns a promise (need to use .then after invoking generateBrew())
export function generateBrew() {
    return tokenGenerator.generate(OPTIONS).then((parts) => {
        return parts.join('-');
    });
}
