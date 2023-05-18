import React from 'react';

function SignUp() {
  return (
    <div className="SignUp">
      <div className='signUpForm'>
        <label>
          Referral Code:
          <input type="text" name="referral" />
        </label>
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
        <button className="signUpButton">Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;