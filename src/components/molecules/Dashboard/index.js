import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  IC_AddContact,
  IC_Bookmark,
  IC_logout,
  IC_Person,
  IC_Question,
  IC_Setting,
  IC_Telephone,
} from '../../../assets';
import { breakpoints } from '../../../utils/breakpoints';
import MessageCard from '../MessageCard';

const Dashboard = () => {
  const router = useHistory();

  // const [messages, setMessages] = useState([1, 2]);
  const [navbarPopup, setNavbarPopup] = useState(false);

  return (
    <StyledDashboard>
      <div className="header">
        <h1 className="logo">Telegram</h1>
        <svg
          className="navigation"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            navbarPopup ? setNavbarPopup(false) : setNavbarPopup(true);
          }}
        >
          <rect x="6" y="8" width="22" height="3.3" rx="1.65" fill="#7E98DF" />
          <rect
            x="6"
            y="15.7"
            width="13.2"
            height="3.3"
            rx="1.65"
            fill="#7E98DF"
          />
          <rect
            x="6"
            y="23.4"
            width="22"
            height="3.3"
            rx="1.65"
            fill="#7E98DF"
          />
        </svg>
        {navbarPopup && (
          <div className="nav-popover">
            <div
              className="row"
              onClick={() => {
                router.push('/profile');
              }}
            >
              <img src={IC_Setting} alt="icon" />
              <p>Setting</p>
            </div>
            <div className="row">
              <img src={IC_Person} alt="icon" />
              <p>Contacts</p>
            </div>
            <div className="row">
              <img src={IC_Telephone} alt="icon" />
              <p>Calls</p>
            </div>
            <div className="row">
              <img src={IC_Bookmark} alt="icon" />
              <p>Save messages</p>
            </div>
            <div className="row">
              <img src={IC_AddContact} alt="icon" />
              <p>Invite Friends</p>
            </div>
            <div className="row">
              <img src={IC_Question} alt="icon" />
              <p>Telegram FAQ</p>
            </div>
            <div
              className="row"
              onClick={() => {
                router.replace('/auth/login');
              }}
            >
              <img src={IC_logout} alt="icon" />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
      <div className="search-wrapper">
        <div className="search-input-wrapper">
          <svg
            className="icon-search"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9.5" cy="9.5" r="8" stroke="#848484" stroke-width="3" />
            <rect
              x="14"
              y="16.1213"
              width="3"
              height="8.74773"
              rx="1.5"
              transform="rotate(-45 14 16.1213)"
              fill="#848484"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search contact
        "
          />
        </div>
        <div className="add-contact">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" width="3" height="23" rx="1.5" fill="#7E98DF" />
            <rect
              x="23"
              y="10"
              width="3"
              height="23"
              rx="1.5"
              transform="rotate(90 23 10)"
              fill="#7E98DF"
            />
          </svg>
        </div>
      </div>
      <div className="body">
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </div>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    position: sticky;

    .logo {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 29px;
      line-height: 34px;
      text-align: center;
      color: #7e98df;
      ${breakpoints.lessThan('sm')`
        display: none; 
      `}
    }
    .navigation {
      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
    }
    .nav-popover {
      position: absolute;
      right: 0;
      top: 50px;
      width: 250px;
      padding: 22px 30px;
      background: #7e98df;
      border-radius: 35px 10px 35px 35px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      z-index: 1;
      ${breakpoints.lessThan('lg')` 
          width: 200px; 
      `}
      ${breakpoints.lessThan('sm')`
       border-radius: 10px 35px 35px 35px;
       right: -100px;
       position: fixed;
       
      `}
    }
    .row {
      display: flex;
      align-items: center;
      gap: 1rem;
      p {
        font-style: normal;
        font-family: Rubik;
        font-weight: normal;
        font-size: 16px;
        color: #ffffff;
      }
      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
      img {
        ${breakpoints.lessThan('lg')` 
          display: none; 
      `}
      }
    }
  }
  .search-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    gap: 1rem;
    width: 100%;
    .search-input-wrapper {
      background: #fafafa;
      border-radius: 15px;
      padding: 20px;
      display: flex;
      gap: 10px;
      height: 60px;
      ${breakpoints.lessThan('sm')`
        display: none; 
      `}
      input {
        width: 100%;
        border: 0;
        background-color: transparent;
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #848484;

        &:focus {
          outline: none;
        }
      }
    }
    .add-contact {
      box-sizing: content-box;
      width: 32px;
      height: 32px;
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    ${breakpoints.lessThan('sm')` 
      gap: 0;
    `}
  }
`;
