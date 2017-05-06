import React from 'react';

const LoadingPage = () => {
  return(
    <div className="loading-page">
      <aside className="loading-left-side">
        <div className="loading-banner">
          <div className="space-between-loading">
            <div className="semi-long-loading-div"></div>
            <div className="small-oval-loading-div"></div>
          </div>

          <div className="flex-items-loading">
            <div className="circle-loading-div"></div>
            <div className="short-loading-div"></div>
          </div>
        </div>

        <div className="loading-list-block">
          <div className="long-loading-div"></div>
          <div className="medium-loading-div"></div>
          <div className="long-loading-div"></div>
        </div>

        <div className="loading-list-block">
          <div className="long-loading-div"></div>
          <div className="medium-loading-div"></div>
          <div className="long-loading-div"></div>
        </div>

      </aside>
      <main className="loading-body">
        <header className="loading-body-header">
          <div>
            <div className="second-longest-loading-div"></div>
            <div className="short-loading-div"></div>
          </div>
          <div className="loading-right-header">
            <div className="loading-pill-empty"></div>
            <div className="loading-pill-right-full">
              <div className="loading-pill-div"></div>
              <div className="longest-loading-div"></div>
              <div className="loading-pill-div"></div>
              <div className="loading-pill-div"></div>
              <div className="loading-pill-div"></div>
            </div>
          </div>
        </header>
        <section>
          <h1>Loading...</h1>
        </section>
      </main>
    </div>
  );
};

export default LoadingPage;
