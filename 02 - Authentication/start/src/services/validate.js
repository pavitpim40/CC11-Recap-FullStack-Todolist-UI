export function validateRegister(input) {
  const err = {};

  if (!input.username) {
    err.username = 'username is required';
  }

  if (!input.email) {
    err.email = 'email is required';
  }

  if (!input.password) {
    err.password = 'password is required';
  }

  if (input.password.length < 6) {
    err.password = 'password must be at least 6 characters';
  }

  if (input.password !== input.confirmPassword) {
    err.password = 'password did not match';
  }

  return err;
}

export function validateLogin(input) {
  const err = {};

  if (!input.username) {
    err.username = 'username is required';
  }

  if (!input.password) {
    err.password = 'password is required';
  }

  return err;
}
