/**
 * VERY simple email validation
 *
 * @param {String} email - email to be validated
 * @return {Boolean}
 */
export function validateEmail(email) {
  return email?.indexOf("@") !== -1 && email.length >= 6 && email.length <= 60;
}

/**
 * Ensures password is of at least a certain length
 *
 * @param {String} password - password to be validated
 * @param {Integer} length - length password must be as long as
 * @return {Boolean}
 */
export function validatePassword(password, length = 5, maxLength = 20) {
  return password?.length >= length && password?.length <= maxLength;
}

/**
 * Ensures a username consists of only letters, numbers, underscores, and dashes
 *
 * @param {String} username - username to be validated
 * @return {Boolean}
 */
export function validateUsername(username) {
  return (
    /^[a-zA-Z0-9_-]+$/.test(username) &&
    username?.length >= 1 &&
    username?.length <= 30
  );
}

/**
 * Ensures first or last name is the proper length
 *
 * @param {String} name - name to be validated
 * @return {Boolean}
 */
export function validateName(name) {
  return name?.length >= 1 && name?.length <= 30;
}

/**
 * Ensures a price field matches the general format: 9.99 or 2199999.99
 *
 * @param {String} price - price to be validated
 * @return {Boolean}
 */
export function validatePrice(price) {
  return /^\d+\.\d{1,2}$/.test(String(price).trim());
}

const validation = {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
  firstName: validateName,
  lastName: validateName,
  price: validatePrice
};

export default validation;
