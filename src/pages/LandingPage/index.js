import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IL_BGLandingPage } from '../../assets';
import { breakpoints } from '../../utils/breakpoints';

const LandingPage = () => {
  const router = useHistory();
  return (
    <StyledLandingPage>
      <div className="bg-layer">
        <img src={IL_BGLandingPage} alt="bg" />
      </div>
      <div className="container">
        <nav>
          <h1 className="logo-brand">Telegram Clone</h1>
          <div className="action-wrapper">
            <button
              className="outline"
              onClick={() => router.push('/auth/login')}
            >
              Login
            </button>
            <button onClick={() => router.push('/auth/register')}>
              Register
            </button>
          </div>
        </nav>
        <main>
          <h1 className="heading-content">Connection World with telegram</h1>
          <p className="paragraph">
            We have a mission to connect all people from all over through
            technology and the telegram application
          </p>
          <button
            className="try-it-now"
            onClick={() => router.push('/auth/login')}
          >
            Try It Now
          </button>
          <div className="action-wrapper under">
            <button
              className="outline"
              onClick={() => router.push('/auth/login')}
            >
              Login
            </button>
            <button onClick={() => router.push('/auth/register')}>
              Register
            </button>
          </div>
        </main>
      </div>
    </StyledLandingPage>
  );
};

export default LandingPage;

// STYLING
const StyledLandingPage = styled.div`
  height: 100vh;

  .bg-layer {
    background-color: #7e98df;

    position: absolute;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-end;
    z-index: -1;
    img {
      position: absolute;
      width: 100%;
      height: 80%;
      /* object-fit: cover; */
    }
  }
  width: 100vw;
  .container {
    width: 1500px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    ${breakpoints.lessThan('2xl')`
      width: 100%; 
    `}
    nav {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;
      .logo-brand {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 29px;
        line-height: 40px;
        color: #ffffff;
        ${breakpoints.lessThan('md')`
          width: 100%;
          text-align: center; 
        `}
      }
    }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .heading-content {
        font-family: Rubik;
        font-style: normal;
        max-width: 800px;
        ${breakpoints.lessThan('md')`
          width: 100%;
        `}
        font-weight: 800;
        font-size: 68px;
        line-height: 102px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 50px;
        ${breakpoints.lessThan('lg')`
          font-size: 50px;
          line-height: 70px;
        `}
      }
      .paragraph {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 31px;
        text-align: center;
        color: #ffffff;
        max-width: 400px;
        ${breakpoints.lessThan('md')`
          width: 100%;
        `}
      }
      .try-it-now {
        background: #ffffff;
        box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
        border-radius: 12px;
        border: 0;
        width: 180px;
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-align: center;
        color: #6379f4;
        padding: 16px 0;
        margin-top: 50px;
        ${breakpoints.lessThan('md')`
          display: none;
        `}
      }
    }
    .action-wrapper {
      ${breakpoints.lessThan('md')`
          display: none;
        `}
      button {
        font-family: Rubik;
        box-sizing: content-box;
        border: 0;
        border-radius: 15px;
        width: 150px;
        padding: 11px 0;
        text-align: center;
        margin-left: 1rem;
        background: #ffffff;
        box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
        border-radius: 12px;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
        color: #6379f4;
        &.outline {
          color: #ffffff;
          background-color: transparent;
          border: 2px solid #ffffff;
        }
      }
      &.under {
        display: none;
        margin-top: 50px;
        ${breakpoints.lessThan('md')`
            display: flex; 
            padding: 0 50px;
        `}
        ${breakpoints.lessThan('sm')`
          flex-direction: column; 
        `}
        width: 100%;
        gap: 1rem;
        button {
          ${breakpoints.lessThan('sm')`
              width: 100%;
          `}
          margin-left: 0;
          width: 50%;
        }
      }
    }
  }
  button:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
