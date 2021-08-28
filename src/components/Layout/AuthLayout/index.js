import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { breakpoints } from '../../../utils';

const AuthLayout = ({ children }) => {
  return (
    <StyledAuthLayout>
      <div className="children">{children}</div>
    </StyledAuthLayout>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.element,
};

// STYLING
const StyledAuthLayout = styled.div`
  background-color: #f6f6f6;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${breakpoints.lessThan('sm')` 
    padding: 0 1rem; 
  `}
  .children {
    display: flex;
    height: 700px;
  }
`;
