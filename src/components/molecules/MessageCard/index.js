import React from 'react';
import { AvatarDefault } from '../../../assets';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from '../../../utils/breakpoints';

const MessageCard = ({ username, avatar, message, time, onClick }) => {
  return (
    <StyledMessageCard onClick={onClick}>
      <div className="avatar-wrapper">
        <img src={avatar} alt="user" />
      </div>
      <div className="content-wrapper">
        <div className="body">
          <h4 className="username">{username}</h4>
          <p className="message gray">{message}</p>
        </div>
        <div className="number-wrapper">
          <p className="times">{time}</p>
          {/* <div className="circle-unread">
            <p>2</p>
          </div> */}
        </div>
      </div>
    </StyledMessageCard>
  );
};

MessageCard.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  message: PropTypes.string,
  time: PropTypes.string,
};

MessageCard.defaultProps = {
  username: 'Username',
  avatar: AvatarDefault,
  // message: 'Message',
  // time: '00:00',
};

export default MessageCard;

const StyledMessageCard = styled.div`
  display: flex;
  .avatar-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    ${breakpoints.lessThan('lg')` 
      display: none; 
    `}
    ${breakpoints.lessThan('sm')`
        display: block; 
    `}
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  .content-wrapper {
    display: flex;
    flex: 1;
    ${breakpoints.lessThan('sm')` 
      display: none; 
    `}
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
    .body {
      margin-left: 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .username {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        /* margin-bottom: 2px; */
        line-height: 21px;
        letter-spacing: -0.165px;
        color: #232323;
      }
      .message {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 17px;
      }
    }
    .number-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 6px;
      .times {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;

        color: #848484;
      }
      .circle-unread {
        background: #7e98df;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-family: Rubik;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          text-align: center;

          color: #ffffff;
        }
      }
    }
  }
`;
