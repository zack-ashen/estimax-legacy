import { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const auth = () => {
    fetch('/api/auth/signin', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }


  return (
    <div className="SignIn">
    <label>
      Email:
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
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
    <button value="Sign In" onClick={auth}/>
    </div>
  );
}

export default SignIn;