import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IC_AddContact,
  IC_Bookmark,
  IC_Person,
  IC_Question,
  IC_Setting,
  IC_Telephone,
} from '../../../assets';
import MessageCard from '../MessageCard';

const Dashboard = () => {
  const router = useHistory();

  // const [messages, setMessages] = useState([1, 2]);
  const [navbarPopup, setNavbarPopup] = useState(false);

  return (
    <div className="dashboard">
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
        <svg
          className="add-contact"
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
    </div>
  );
};

export default Dashboard;
