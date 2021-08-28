import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  AvatarDefault,
  IC_Bell,
  IC_Graph,
  IC_List,
  IC_Lock,
  IC_Monitor,
} from '../../../assets';

const ProfileUser = ({ username, avatar }) => {
  const router = useHistory();

  return (
    <StyledProfileUser>
      <div className="header">
        <svg
          onClick={() => {
            return router.goBack();
          }}
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.20711 9.3271L9.22925 3.30496C9.24226 3.29283 9.2551 3.28044 9.26777 3.26777L9.97487 2.56066C10.5607 1.97487 10.5607 1.02513 9.97487 0.43934C9.38909 -0.146447 8.43934 -0.146447 7.85355 0.43934L7.52579 0.767105L7.52513 0.766442L0.732233 7.55933C-0.244077 8.53564 -0.244079 10.1186 0.732233 11.0949L7.14646 17.5091L7.52513 17.8878L7.85357 18.2162C8.43936 18.802 9.3891 18.802 9.97489 18.2162C10.5607 17.6304 10.5607 16.6807 9.97489 16.0949L9.64645 15.7664L9.26778 15.3878C9.26635 15.3863 9.2649 15.3849 9.26346 15.3835L3.20711 9.3271Z"
            fill="#7E98DF"
          />
        </svg>
        <h3 className="text-md-bold primary text-center">{username}</h3>
      </div>
      <div className="profile-section">
        <div className="avatar-wrapper">
          <img src={avatar} alt={username} />
        </div>
        <h3 className="fullname">Gloria Mckinney</h3>
        <p className="username">@wdlam</p>
      </div>
      <div className="section">
        <h5 className="heading-lg">Account</h5>
        <p className="subheading">+375(29)9638433</p>
        <Link to="#" className="anchor primary">
          Tap to change phone number
        </Link>
        <div className="divider" />
      </div>
      <div className="section">
        <h5 className="heading-md">@wdlam</h5>
        <p className="text-md-regular gray">Username</p>
        <div className="divider" />
      </div>
      <div className="section">
        <h5 className="heading-md">
          I’m Senior Frontend Developer from Microsoft
        </h5>
        <p className="text-md-regular gray">Bio</p>
        <div className="divider" />
      </div>
      <div className="section">
        <h5 className="heading-lg">Settings</h5>
        <div className="setting-items">
          <div className="row">
            <img src={IC_Bell} alt="icon" />
            <p className="text-md-regular">Notification and Sounds</p>
          </div>
          <div className="row">
            <img src={IC_Lock} alt="icon" />
            <p className="text-md-regular">Privaty and Security</p>
          </div>
          <div className="row">
            <img src={IC_Graph} alt="icon" />
            <p className="text-md-regular">Data and Stronge</p>
          </div>
          <div className="row">
            <img src={IC_List} alt="icon" />
            <p className="text-md-regular">Chat settings</p>
          </div>
          <div className="row">
            <img src={IC_Monitor} alt="icon" />
            <p className="text-md-regular">Devices</p>
          </div>
        </div>
        <div className="divider" />
      </div>
    </StyledProfileUser>
  );
};

ProfileUser.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

ProfileUser.defaultProps = {
  username: 'Username',
  avatar: AvatarDefault,
};

export default ProfileUser;

const StyledProfileUser = styled.div`
  .header {
    display: flex;
    margin-bottom: 50px;
    .primary {
      flex: 1;
    }
    svg {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #848484;
    margin-top: 25px;
  }
  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-wrapper {
      width: 82px;
      height: 82px;
      margin-bottom: 25px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 30px;
      }
    }
    .fullname {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 26px;
      color: #232323;
    }
    .username {
      font-family: Rubik;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #848484;
    }
  }
  .section {
    margin-top: 25px;
  }
  .heading-lg {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 23px;
    color: #232323;
    margin-bottom: 15px;
  }
  .heading-md {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #232323;
    margin-bottom: 15px;
  }
  .subheading {
    color: #232323;
    margin-bottom: 8px;
  }
  .setting-items {
    .row {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
    }
  }
`;
