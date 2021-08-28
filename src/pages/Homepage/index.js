import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { AvatarDefault, IC_Box, IC_Face, IC_Plus } from '../../assets';
import { Dashboard, ProfileUser } from '../../components/molecules';
import { StyledHomepage } from './styled';

const HomePage = () => {
  let { path, url } = useRouteMatch();

  console.log('path', path);
  console.log('url', url);
  const [messages, setMessages] = useState([1, 2]);

  return (
    <StyledHomepage>
      <div className="container">
        <Switch>
          <Route exact path={path}>
            <aside>
              <Dashboard />
            </aside>
          </Route>
          <Route path={`/profile`}>
            <aside>
              <ProfileUser />
            </aside>
          </Route>
        </Switch>
        <main>
          {messages.length === 0 && (
            <StyledEmptyChat>
              <p>Please select a chat to start messaging</p>
            </StyledEmptyChat>
          )}
          {messages.length > 1 && (
            <StyledChatRoom>
              <div className="header-section">
                <div className="contact-wrapper">
                  <div className="avatar">
                    <img src={AvatarDefault} alt="avatar" />
                  </div>
                  <div className="desc">
                    <h3>Username</h3>
                    <p>Online</p>
                  </div>
                </div>
                <div className="icon-more">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="5"
                      height="5"
                      rx="2.5"
                      fill="#7E98DF"
                    />
                    <rect
                      x="17"
                      y="2"
                      width="5"
                      height="5"
                      rx="2.5"
                      fill="#7E98DF"
                    />
                    <rect
                      x="2"
                      y="16"
                      width="5"
                      height="5"
                      rx="2.5"
                      fill="#7E98DF"
                    />
                    <rect
                      x="17"
                      y="16"
                      width="5"
                      height="5"
                      rx="2.5"
                      fill="#7E98DF"
                    />
                  </svg>
                </div>
              </div>
              <div className="chat-section">
                <div className="chat others">
                  <p className="message">Oh! Cool Send me photo)</p>
                  <img className="avatar" src={AvatarDefault} alt="user" />
                </div>
                <div className="chat me">
                  <p className="message">Fromm me</p>
                  <img className="avatar" src={AvatarDefault} alt="user" />
                </div>
              </div>
              <div className="input-section">
                <div className="input-wrapper">
                  <input type="text" placeholder="Type your message.." />
                  <div className="action-button-wrapper">
                    <div className="icon">
                      <img src={IC_Plus} alt="icon" />
                    </div>
                    <div className="icon">
                      <img src={IC_Face} alt="icon" />
                    </div>
                    <div className="icon">
                      <img src={IC_Box} alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </StyledChatRoom>
          )}
        </main>
      </div>
    </StyledHomepage>
  );
};

export default HomePage;

const StyledEmptyChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    color: #848484;
  }
`;

const StyledChatRoom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  .header-section {
    top: 0;
    padding: 0 50px;
    background: #ffffff;
    position: absolute;
    height: 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .contact-wrapper {
      display: flex;
      gap: 1rem;
      align-items: center;
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
      .avatar {
        width: 64px;
        height: 64px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 20px;
        }
      }
    }
    .icon-more {
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
    }
  }

  .chat-section {
    padding: 0 50px;
    background-color: yellow;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 150px;
    .chat {
      background-color: orange;
      display: flex;
      img {
        height: 64px;
        width: 64px;
        object-fit: contain;
        border-radius: 20px;
      }
    }
  }
  height: 100%;
  .input-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    .input-wrapper {
      padding: 21px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
      border-radius: 15px;
      input {
        border: 0;
        width: 100%;
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
      .action-button-wrapper {
        display: flex;
        gap: 22px;
      }
    }
  }
`;
