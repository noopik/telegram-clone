import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SuccessLogo } from '../../assets';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { apiAdapter } from '../../config';
import { dispatchTypes, toastify } from '../../utils';
import { useDispatch } from 'react-redux';

const AccountVerified = () => {
  const history = useHistory();
  const token = history.location.pathname.split('/').pop();
  const toLogin = () => {
    history.replace(`/auth/login`);
  };
  const decoded = jwt.decode(token);
  const dispatch = useDispatch();

  // console.log('decoded', decoded);

  useEffect(() => {
    if (decoded) {
      const update = {
        verification: 1,
      };
      apiAdapter
        .patch(`/users/${decoded.idUser}`, update, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // setPhoneSubmit(false);
          dispatch({ type: dispatchTypes.setUserVerification, value: 1 });
        })
        .catch((err) => {
          // console.log('ERR', err.response);
          const message = err.response?.data.message;
          // setPhoneSubmit(false);

          return toastify(message, 'error');
        });

      setTimeout(() => {
        toLogin();
      }, 8000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(decoded);

  if (!decoded) {
    toLogin();
    return null;
  }

  return (
    <Styles>
      <div className="container">
        <div className="inner-wrap">
          <div class="logo">Telegram Clone</div>

          <h1>
            Congratulation {decoded.name}!
            <br />
            Your account has been successfully <br /> activated
          </h1>

          <div class="centerImage">
            <img src={SuccessLogo} alt="logo" />
          </div>

          <div class="text">
            Now you can enjoy all the features of Telegram Clone.
            <br />
            Click the button below to start the adventure
          </div>

          <input
            type="button"
            name=""
            id=""
            value="Start Journey"
            class="Btn"
            onClick={() => toLogin()}
          ></input>
        </div>
        <div class="footer"></div>
      </div>
    </Styles>
  );
};

export default AccountVerified;
const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .container {
    width: 600px;
    height: 707px;
    background: #ffffff;
    padding-top: 40px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    border-radius: 20px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-family: Rubik;
    .inner-wrap {
      padding-left: 70px;
      padding-right: 70px;
      .logo {
        margin-top: 20px;
        font-style: normal;
        font-weight: bold;
        font-size: 29px;
        line-height: 40px;
        color: #6379f4;
        text-align: center;
      }
      h1 {
        margin-top: 35px;
        font-weight: 600;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        color: #253757;
      }
      .centerImage {
        margin-top: 25px;
        margin-left: 29%;
        margin-right: 29%;
      }
      .text {
        margin-top: 39px;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        color: #46505c;
      }
      .Btn {
        width: 204px;
        height: 36px;
        margin-top: 28px;
        border-radius: 50px;
        background: #6379f4;
        color: white;
        border: 1px solid lightgray;
        outline: none;
        cursor: pointer;
        margin-left: 28%;
        margin-right: 28%;
      }
    }
    .footer {
      margin-top: 75px;
      width: 100%;
      height: 20px;
      margin-right: 0;
      background: #6379f4;
      font-size: 14px;
      border-radius: 0px 0px 20px 20px;
    }
  }
`;
