import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const StyledHomepage = styled.div`
  .container {
    width: 1500px;
    margin: 0 auto;
    display: flex;
    height: 100vh;
    box-shadow: 0px 0px 100px rgba(126, 152, 223, 0.05);
    aside {
      padding: 40px 30px;
      background-color: #ffffff;
      overflow-y: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      width: 350px;
      &::-webkit-scrollbar {
        /* WebKit */
        width: 0;
        height: 0;
      }
      .dashboard {
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
          position: relative;
          .logo {
            font-family: Rubik;
            font-style: normal;
            font-weight: 500;
            font-size: 29px;
            line-height: 34px;
            text-align: center;
            color: #7e98df;
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
            .row {
              display: flex;
              align-items: center;
              gap: 1rem;
              &:hover {
                opacity: 0.5;
                cursor: pointer;
              }
              p {
                font-style: normal;
                font-family: Rubik;
                font-weight: normal;
                font-size: 16px;
                color: #ffffff;
              }
            }
          }
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 50px;
          .search-input-wrapper {
            background: #fafafa;
            border-radius: 15px;
            padding: 20px;
            display: flex;
            gap: 10px;
            height: 60px;
            margin-right: 1rem;
            svg {
              /* background-color: yellow; */
            }
            input {
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
          }
        }
        .body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          .contact-wrapper {
            display: flex;
            .avatar-wrapper {
              width: 64px;
              height: 64px;
              border-radius: 20px;
              background-color: blue;
              &:hover {
                cursor: pointer;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
            .content-wrapper {
              display: flex;
              flex: 1;
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
                  margin-bottom: 4px;
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
          }
        }
      }
    }
    main {
      background-color: #fafafa;
      flex: 1;
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
    }
  }

  ${breakpoints.lessThan('2xl')`
      background-color: yellow;
    `}
  ${breakpoints.lessThan('xl')`
      background-color: blue;
    `}
    ${breakpoints.lessThan('lg')`
      background-color: cyan;
    `}
    ${breakpoints.lessThan('md')`
      background-color: pink;
    `}
    ${breakpoints.lessThan('sm')`
      background-color: green;
    `}
    ${breakpoints.lessThan('xsm')`
      background-color: pink;
    `}
`;
