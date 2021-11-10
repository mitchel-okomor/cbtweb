/* eslint-disable no-useless-escape */
import _ from 'lodash';

const validate = (inputs, setError) => {
  let errObj = {};
  for (const [key, value] of Object.entries(inputs)) {
    if (!value || value.length < 1) {
      errObj = { ...errObj, [key]: 'Field cannot be blank' };
    }
    if (value.length > 0) {
      if (key === 'password' && value.length < 6) {
        errObj = { ...errObj, [key]: `${key} is too short` };
      }
    }
    if (
      key === 'confirmPassword' &&
      value.length > 0 &&
      value !== inputs?.password
    ) {
      errObj = { ...errObj, [key]: 'Passwords do not match' };
    }
    if (value.length > 0) {
      if (key === 'email') {
        const valid =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        if (!valid) {
          errObj = { ...errObj, [key]: 'Invalid email address' };
        }
      }
    }

    setError(errObj);
    setTimeout(function () {
      setError();
    }, 15000);
  }
  return _.isEmpty(errObj);
};
export default validate;
