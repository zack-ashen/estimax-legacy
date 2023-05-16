import React from 'react';
import './App.css';
import Helmet from 'react-helmet'

import { ReactComponent as Logo } from './assets/logo.svg';

function App() {
  return (
    <div className="Landing">
      <nav>
        <Logo className="Logo"/>
        <button className='joinWaitlistButton'>Join Waitlist</button>
      </nav>

      <div className="heroSection">
        <div>
          <h1>Connecting contractors to leads.</h1>
          <p>We connect contractors to homeowners through an open bidding 
            platform Making free, high quality lead generation as easy as 
            scrolling and bidding.</p>
        </div>
        
      </div>

      <div className='guideSection'>
        
      </div>

      <div className='feature-1'>

      </div>

      <div className='faqSection'>

      </div>

      <div id="getWaitlistContainer" data-waitlist_id="7960" data-waiter_email_placeholder_value="abc@example.com"></div>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css"/>
        <script src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></script>
      </Helmet>
    </div>
  );
}

export default App;