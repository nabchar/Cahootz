import React from 'react';
import { Link, hashHistory } from 'react-router';


const handleClick = () => {
  return hashHistory.push('/signup')
};

const Splash = () => {

  return(
    <div className='splash-main'>
      <header className="splash-header">
        <div>
          <Link className="splash-logo" to={'/'}>
            <i className="fa fa-slack" aria-hidden="true"></i>
            <strong>cahootz</strong>
          </Link>
        </div>
        <div className='link-container'>
          <div>
            <Link className='splash-header-link' to={'/signin'}>Sign In</Link>
          </div>
          <div>
            <Link className='splash-header-link demo' to={'/try'}>Demo</Link>
          </div>
        </div>
      </header>

      <section className='splash-outer'>
        <section className='splash-content'>
          <div className='splash-tagline-wrapper'>
            <h1 className='splash-tagline'>Hatch your next plan</h1>
          </div>

          <div className='splash-subtag-wrapper'>

            <p className='splash-subtag'>
              For every scheme, Cahootz brings all the pieces
              <br></br>
              and people you need together.
            </p>

            <div className='splash-signup'>

              <button className='guest-button' onClick={handleClick}>
                Get Started
              </button>

              <p className='signin-text'>
                Already a member of Cahootz?  <Link to={'/signin'}>Sign in</Link>
              </p>

            </div>
          </div>
        </section>

        <figure className='splash-image'>

        </figure>

      </section>

      <footer>

      </footer>
    </div>
  );
};



export default Splash;
