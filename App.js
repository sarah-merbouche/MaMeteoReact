import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import About from './components/About';
import SearchStack, {Search} from './components/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function App() {

  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      if(route.name === 'Search'){
        return Search.icon(focused, size, color);
      }
      if(route.name === 'About'){
        return About.icon(focused, size, color);
      }
      return <Ionicons name="none" size={size} color={color}/>
    }
  })

  const tabBarOptions = {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    showLabel: false,
    tabStyle: {
      backgroundColor: '#A2273C',
      borderTopWidth: 1,
      borderColor: '#3F101C'
    }
  }

  return (
    <View style={{flex:1}}>
      <StatusBar hidden={true}/>
      <NavigationContainer>
          <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
            <Tab.Screen name="Search" component={SearchStack}/>
            <Tab.Screen name="About" component={About}/>
          </Tab.Navigator>
          
      </NavigationContainer>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
