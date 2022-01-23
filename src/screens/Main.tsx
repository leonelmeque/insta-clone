// React imports
import React from 'react'
import { FunctionComponent } from 'react';

// Navigation imports
import { AppTabNavigation } from '@navigation/index';

interface MainScreenProps {}

const MainScreen: FunctionComponent<
  MainScreenProps
> = () => {
  return <AppTabNavigation />;
};

export default MainScreen;
