import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const StyledContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #c5ebde;
  padding: 20px
`;

const BaseContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default BaseContainer;