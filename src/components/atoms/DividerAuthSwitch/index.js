import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from '../../../utils';

const DividerAuthSwitch = ({ title }) => {
  return (
    <StyledDividerAuthSwitch>
      <div className="line" />
      <p className="title text-center">{title}</p>
      <div className="line" />
    </StyledDividerAuthSwitch>
  );
};

DividerAuthSwitch.propTypes = {
  title: PropTypes.string.isRequired,
};

DividerAuthSwitch.defaultProps = {
  title: 'Title divider',
};

export default DividerAuthSwitch;

const StyledDividerAuthSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #848484;
  .line {
    width: 100px;
    height: 1px;
    background-color: #848484;
    ${breakpoints.lessThan('sm')` 
      display: none; 
    `}
  }
  .title {
    ${breakpoints.lessThan('sm')` 
      width: 100%;
    `}
  }
`;
