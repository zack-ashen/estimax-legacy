import { useState } from 'react';

function SignUp() {
  const [ referral, setReferral ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("")

  const auth = () => {
    // validate password
    // TODO: Confirm password error handling
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    fetch('/api/auth/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        referral
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <div className="SignUp">
      <div className='signUpForm'>
        <label>
          Referral Code:
          <input 
            type="text" 
            name="referral" 
            value={referral}
            onChange={(e) => setReferral(e.target.value)}/>
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input
            type="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm your password:
          <input 
            type="password" 
            name="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="signUpButton" onClick={auth}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;