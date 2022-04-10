import styled from 'styled-components/native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const HomeAppBar = () => (
  <StyledHomeAppBar>
    <Logo
      source={require('assets/images/Instagram_logo.png')}
    />
    <StyledAppBarActions>
      <Action name='add' size={32} />
      <Action name='heart' size={32} />
      <Action name='md-send-sharp' size={32} />
    </StyledAppBarActions>
  </StyledHomeAppBar>
);

const Logo = styled.Image`
  width: 150px;
  height: 100px;
  resize-mode: contain;
`;

const StyledHomeAppBar = styled.View`
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0px 8px;
  border-bottom-width:1px;
  border-color:#D6D6D6;
`;

const StyledAppBarActions = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const Action = styled(Ionicons)`
  margin-left: 18px;
`;
