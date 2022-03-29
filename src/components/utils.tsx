import React, { FunctionComponent } from 'react';
import { View, ViewProps } from 'react-native';
import styled, {
  ReactNativeStyledInterface,
} from 'styled-components/native';

export const HStack = styled(View)`
  flex-direction: ${(props: React.CSSProperties) =>
    props?.flexDirection ? props.flexDirection : 'column'};
  
`;


