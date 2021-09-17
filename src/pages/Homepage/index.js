/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { AvatarDefault, IC_Box } from '../../assets';
import {
  Dashboard,
  ProfileUser,
  TransitionsModal,
} from '../../components/molecules';
import { apiAdapter } from '../../config';
import { isBlank, toastify } from '../../utils';
import { breakpoints } from '../../utils/breakpoints';
import { StyledHomepage } from './styled';

const HomePage = ({ socket }) => {
  moment.locale('id');
  let { path } = useRouteMatch();
  const userState = useSelector((state) => state.userReducer);
  const roomActive = useSelector((state) => state.roomActiveReducer);
  const [messages, setMessages] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const token = localStorage.getItem('token');
  const messagesEndRef = useRef(null);
  const [sendMessage, setSendMessage] = useState('');

  useEffect(() => {
    document.title = `${userState.name} | Telegram`;
  }, []);

  useEffect(() => {
    if (roomActive && socket) {
      socket.off('sendMsgFromServer');
      socket.on('sendMsgFromServer', (data) => {
        // console.log('idSender:', data);
        // console.log('data sendMsgFromServer:', data.idSender);
        // console.log('roomActive.idUser:', roomActive.idUser);

        if (data.idSender === roomActive.idUser) {
          // console.log('idSender', data.idSender);
          // console.log('roomActive.idUser', roomActive.idUser);
          setMessages((currentValue) => {
            const update = {
              bodyMessage: data.body,
              idSender: data.idSender,
            };
            return [...currentValue, update];
          });
        } else if (data.idSender !== userState.idUser) {
          // console.log('callback');
          return toastify(`${data.nameSender} mengirim pesan`, 'right');
        }
      });
    }

    // socket.on('userOnline', (data) => {
    //   console.log('userOnline', data);
    // });
  }, [socket, roomActive]);

  // START =  INPUT MESSAGE

  const sendMessageAction = (event) => {
    event.preventDefault();
    if (!isBlank(sendMessage)) {
      setSendMessage('');
      if (socket) {
        socket.emit(
          'sendMsgFromClient',
          {
            idSender: userState.idUser,
            idReceiver: roomActive.idUser,
            body: sendMessage,
            nameSender: userState.name,
          },
          (data) => {
            setMessages((currentValue) => {
              const message = {
                idSender: userState.idUser,
                bodyMessage: data.body,
              };
              return [...currentValue, message];
            });
          }
        );
      }
    } else {
    }
  };
  // END =  INPUT MESSAGE

  // START = MODAL CONTACT
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // END = MODAL CONTACT

  // START = MESSAGES

  // ======= Scrool to Bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // ======= Scrool to Bottomu

  useEffect(() => {
    if (Object.keys(roomActive).length > 1) {
      apiAdapter
        .get(`/messages/${roomActive.idUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const resData = res.data.data;
          // console.log('resData', resData);
          setMessages(resData);
        })
        .catch((err) => {
          // console.log(err.response);
        });
    }
  }, [roomActive]);

  // END = MESSAGES

  return (
    <StyledHomepage>
      <div className="container">
        <Switch>
          <Route exact path={path}>
            <aside>
              <Dashboard addContactAction={openModal} />
            </aside>
          </Route>
          <Route path={`/profile`}>
            <aside>
              <ProfileUser
                idUser={userState.idUser}
                username={userState.name}
                avatar={userState.avatar}
                phone={userState.phone}
                biography={userState.biography}
              />
            </aside>
          </Route>
        </Switch>
        <main>
          {Object.keys(roomActive).length === 1 && (
            <StyledEmptyChat>
              <p>Please select a chat to start messaging</p>
            </StyledEmptyChat>
          )}
          {Object.keys(roomActive).length > 1 && (
            <StyledMainContent>
              <StyledChatRoom>
                <div className="header-section">
                  <div
                    className="contact-wrapper"
                    onClick={() => {
                      return showContactInfo
                        ? setShowContactInfo(false)
                        : setShowContactInfo(true);
                    }}
                  >
                    <div className="avatar">
                      <img
                        src={
                          roomActive.avatar ? roomActive.avatar : AvatarDefault
                        }
                        alt={roomActive.name}
                      />
                    </div>
                    <div className="desc">
                      <h3>{roomActive.name}</h3>
                      <p className={roomActive.status ? 'online' : 'offline'}>
                        {roomActive.status ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div
                    className="icon-more"
                    onClick={() => {
                      return showContactInfo
                        ? setShowContactInfo(false)
                        : setShowContactInfo(true);
                    }}
                  >
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
                  <div className="display">
                    {/* <div className="chat others">
                    <img className="avatar" src={AvatarDefault} alt="user" />
                    <p className="message">Oh! Cool Send me photo</p>
                  </div>
                  <div className="chat me">
                    <p className="message">Fromm me</p>
                    <img className="avatar" src={AvatarDefault} alt="user" />
                  </div> */}
                    {messages &&
                      messages.map((chat, index) => {
                        return (
                          <>
                            <div
                              className={`chat ${
                                chat.idSender === userState.idUser
                                  ? 'me'
                                  : 'others'
                              }`}
                              key={index}
                            >
                              <div className="box">
                                <div className="message-wrapper">
                                  <p className="message">{chat.bodyMessage}</p>
                                  <p className="time">
                                    {moment(chat.createdAt).calendar()}
                                  </p>
                                </div>
                                <img
                                  className="avatar"
                                  src={
                                    chat.idSender === userState.idUser
                                      ? `${
                                          userState.avatar
                                            ? userState.avatar
                                            : AvatarDefault
                                        }`
                                      : `${
                                          roomActive.avatar
                                            ? roomActive.avatar
                                            : AvatarDefault
                                        }`
                                  }
                                  alt={userState.name}
                                />
                              </div>
                            </div>
                            <div ref={messagesEndRef} />
                            {/* {chat.idSender !== userState.idUser && (
                            <div className="chat others">
                              <img
                                className="avatar"
                                src={AvatarDefault}
                                alt="user"
                              />
                              <p className="message">{chat.bodyMessage}</p>
                            </div>
                          )}
                          {chat.idSender === userState.idUser && (
                            <div className="chat me">
                              <p className="message">{chat.bodyMessage}</p>
                              <img
                                className="avatar"
                                src={userState.avatar}
                                alt={userState.name}
                              />
                            </div>
                          )} */}
                          </>
                        );
                      })}
                  </div>
                </div>
                <div className="input-section">
                  <form onSubmit={sendMessageAction} className="input-wrapper">
                    <input
                      type="text"
                      name="message"
                      autocomplete="off"
                      placeholder="Type your message.."
                      onChange={(e) => setSendMessage(e.target.value)}
                      value={sendMessage}
                    />
                    <div className="action-button-wrapper">
                      {/* <div className="icon">
                        <img src={IC_Plus} alt="icon" />
                      </div>
                      <div className="icon">
                        <img src={IC_Face} alt="icon" />
                      </div> */}
                      <div className="icon" onClick={sendMessageAction}>
                        <img src={IC_Box} alt="icon" />
                      </div>
                    </div>
                  </form>
                </div>
              </StyledChatRoom>
              <StyledContactInfo show={showContactInfo}>
                <div className="header">
                  <svg
                    onClick={() => {
                      return showContactInfo
                        ? setShowContactInfo(false)
                        : setShowContactInfo(true);
                    }}
                    width="11"
                    height="19"
                    viewBox="0 0 11 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.20711 9.3271L9.22925 3.30496C9.24226 3.29283 9.2551 3.28044 9.26777 3.26777L9.97487 2.56066C10.5607 1.97487 10.5607 1.02513 9.97487 0.43934C9.38909 -0.146447 8.43934 -0.146447 7.85355 0.43934L7.52579 0.767105L7.52513 0.766442L0.732233 7.55933C-0.244077 8.53564 -0.244079 10.1186 0.732233 11.0949L7.14646 17.5091L7.52513 17.8878L7.85357 18.2162C8.43936 18.802 9.3891 18.802 9.97489 18.2162C10.5607 17.6304 10.5607 16.6807 9.97489 16.0949L9.64645 15.7664L9.26778 15.3878C9.26635 15.3863 9.2649 15.3849 9.26346 15.3835L3.20711 9.3271Z"
                      fill="#7E98DF"
                    />
                  </svg>
                  <h3 className="text-md-bold primary text-center">
                    {roomActive.name}
                  </h3>
                </div>
                <div className="profile-section">
                  <img
                    src={roomActive.avatar ? roomActive.avatar : AvatarDefault}
                    alt={roomActive.name}
                    className="avatar"
                  />
                </div>
                <div className="desc-section">
                  <div className="desc">
                    <h4 className="text-md-bold">{roomActive.name}</h4>
                    <p
                      className={`text-md-regular ${
                        roomActive.status ? 'online' : 'offline'
                      }`}
                    >
                      {roomActive.status ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1" fill="white">
                      <path d="M0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V16C22 18.2091 20.2091 20 18 20H1C0.447716 20 0 19.5523 0 19V4Z" />
                    </mask>
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V16C22 18.2091 20.2091 20 18 20H1C0.447716 20 0 19.5523 0 19V4Z"
                      stroke="#7E98DF"
                      strokeWidth="4"
                      mask="url(#path-1-inside-1)"
                    />
                    <rect
                      x="5"
                      y="9"
                      width="12"
                      height="2"
                      rx="1"
                      fill="#7E98DF"
                    />
                    <rect
                      x="5"
                      y="5"
                      width="12"
                      height="2"
                      rx="1"
                      fill="#7E98DF"
                    />
                    <rect
                      x="5"
                      y="13"
                      width="12"
                      height="2"
                      rx="1"
                      fill="#7E98DF"
                    />
                  </svg>
                </div>
                <div className="desc-section">
                  <div className="desc">
                    <h4 className="text-md-bold">Phone number</h4>
                    <p className="text-md-regular">{roomActive.phone}</p>
                  </div>
                </div>
                <div className="divider" />
              </StyledContactInfo>
            </StyledMainContent>
          )}
        </main>
      </div>
      <TransitionsModal
        showModal={showModal}
        openModal={openModal}
        closeModal={closeModal}
      />
    </StyledHomepage>
  );
};

export default HomePage;

const StyledEmptyChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  p {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    color: #848484;
  }
`;

const StyledMainContent = styled.div`
  display: flex;
  flex-shrink: 1;
  height: 100vh;
  position: relative;
  /* ${breakpoints.lessThan('md')`
    width: 500px;
  `} */
`;

const StyledChatRoom = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
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
          object-fit: cover;
          border-radius: 20px;
        }
      }
      .desc {
        p {
          margin-top: 4px;
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
    /* flex: 1; */
    padding-bottom: 150px;
    padding-top: 130px;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    height: 100%;
    &::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
    .display {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 1rem;
    }

    .chat {
      display: flex;
      .box {
        display: flex;
        gap: 15px;
        .message-wrapper {
          display: flex;
          gap: 10px;
          .time {
            color: #bebebe;
            font-size: 14px;
            margin-top: 6px;
          }
        }
      }
      .message {
        max-width: 350px;
        padding: 20px 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Rubik;

        ${breakpoints.lessThan('lg')`
          max-width: 200px; 
        `}
      }
      &.others {
        display: flex;
        .box {
          flex-direction: row-reverse;
          display: flex;
          justify-content: start;
        }
        .message {
          background: #7e98df;
          border-radius: 35px 35px 35px 10px;
          color: #ffffff;
        }
      }
      &.me {
        display: flex;
        justify-content: flex-end;
        .message-wrapper {
          display: flex;
          flex-direction: row-reverse;
          .message {
            background: #ffffff;
            border-radius: 35px 10px 35px 35px;
          }
        }
      }
      img {
        ${breakpoints.lessThan('lg')`
          display: none;
        `}
        height: 64px;
        width: 64px;
        object-fit: cover;
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
        color: #272727;
        background-color: transparent;
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
  .online {
    color: #00b900 !important;
  }
`;

const StyledContactInfo = styled.div`
  background-color: #ffffff;
  padding: 40px 30px;
  width: 350px;
  border-left: 1px solid #e5e5e5;
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  ${breakpoints.lessThan('lg')` 
    width: 250px; 
  `}
  .header {
    display: flex;
    margin-bottom: 50px;
    justify-content: center;
    gap: 25px;
    svg {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .profile-section {
    text-align: center;
    .avatar {
      height: 84px;
      width: 84px;
      border-radius: 30px;
    }
  }
  .desc-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
    .desc {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .online {
        color: #00b900 !important;
      }
    }
  }
  .divider {
    background: #f6f6f6;
    margin-top: 22px;
    height: 2px;
  }
`;
