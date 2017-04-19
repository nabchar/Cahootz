import React from 'react';
import { Link } from 'react-router';

const Splash = ()=> {
  return(
    <div className='splash-main'>
      <header className='splash-header'>
        <h3>Cahootz</h3>
        <p><Link to={'/signin'}>Sign In</Link></p>
      </header>

      <section className='splash-outer'>
        <figure className='splash-image'>

        </figure>

        <section className='splash-content'>
          <div className='splash-tagline-wrapper'>
            <h1 className='splash-tagline'>Hatch your next plan</h1>
          </div>

          <div className='splash-subtag-wrapper'>

            <p className='splash-subtag'>
              For every scheme, Cahootz brings all the pieces and people you need together.
            </p>

            <div className='splash-signup'>

              <button>
                <Link to={'/signup'}>Get Started</Link>
              </button>

              <span>
                Already a member of Cahootz?
                <Link to={'/signin'}>Sign in</Link>
              </span>

            </div>
          </div>
        </section>
      </section>

      <footer>

      </footer>
    </div>
  );
};



export default Splash;
