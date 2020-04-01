import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Detail from './pages/Detail';
import Configure from './pages/Configure';
import ScanQrcode from './pages/ScanQrcode';
import ProductDetail from './pages/ProductDetail';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="Configure" component={Configure} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="ScanQrcode" component={ScanQrcode} />
        <AppStack.Screen name="ProductDetail" component={ProductDetail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
