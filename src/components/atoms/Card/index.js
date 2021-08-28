import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};
Card.propTypes = {
  children: PropTypes.element,
};

export default Card;

const StyledCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
`;
