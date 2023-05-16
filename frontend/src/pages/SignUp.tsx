import React from 'react';

function SignUp() {
  return (
    <div className="SignUp">
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          Confirm your password:
          <input type="password" name="confirmPassword" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SignUp;