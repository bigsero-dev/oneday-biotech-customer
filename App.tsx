/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { enableScreens } from "react-native-screens";

// import LoginScreen from './src/screens/Auth/LoginScreen/LoginScreen';
import { SheetProvider } from 'react-native-actions-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from "stores";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from 'react-native-root-siblings';
import AppNavigator from 'navigations/AppNavigator';
import { NavermapsProvider } from 'react-naver-maps';

const App = () => {
  enableScreens(true);

  return (
    <SheetProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootSiblingParent>

              <AppNavigator />

            </RootSiblingParent>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </SheetProvider>
  );
}

export default App;
