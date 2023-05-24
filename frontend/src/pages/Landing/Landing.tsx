import { useNavigate } from 'react-router-dom';

import './Landing.css';


function Landing() {
  const navigate = useNavigate();

  return (
    <div className="Landing">
      <nav>
        <h1>Estimax</h1>
        <button className='signInButton' onClick={() => navigate("/signin")}>Sign In</button>
        <button className='signInButton' onClick={() => navigate("/signup")}>Sign Up</button>
      </nav>
    </div>
  );
}

export default Landing;