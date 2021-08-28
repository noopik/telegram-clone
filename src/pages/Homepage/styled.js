import styled from 'styled-components';
import { breakpoints } from '../../utils/breakpoints';

export const StyledHomepage = styled.div`
  .container {
    width: 1500px;
    margin: 0 auto;
    display: flex;
    height: 100vh;
    box-shadow: 0px 0px 100px rgba(126, 152, 223, 0.05);
    ${breakpoints.lessThan('2xl')`
      width: 100vw; 
    `}
    aside {
      padding: 40px 30px;
      background-color: #ffffff;
      overflow-y: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      width: 350px;
      ${breakpoints.lessThan('lg')` 
        width: 250px; 
      `}
      ${breakpoints.lessThan('sm')`
        width: 60px; 
        padding: 40px 16px;
      `}
      &::-webkit-scrollbar {
        /* WebKit */
        width: 0;
        height: 0;
      }
    }
    main {
      background-color: #fafafa;
      flex: 1;
    }
  }
`;
