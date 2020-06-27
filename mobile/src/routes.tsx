import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../src/pages/Home';
import Points from '../src/pages/Points';
import Detail from '../src/pages/Detail';
import New from '../src/pages/New';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#EBDEF0',
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="New" component={New} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
