import React, { Component } from 'react'
import { View, TextInput, Button, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from '../Styles';
import { createStackNavigator } from '@react-navigation/stack';
import Result from './Result';


const Stack = createStackNavigator();

function SearchStack() {

    const screenOptions = {
        headerShown: true,
        headerTintColor: style.header.color,
        headerStyle: {
            backgroudColor: style.header.backgroundColor
        }
    };

    const searchOption =  {
        title: 'Rechercher une ville',
        headerTintColor: screenOptions.headerTintColor,
        headerStyle: { backgroundColor: screenOptions.headerStyle.backgroudColor},
    }

    const resultOption = ({route}) => {
        return {
            title: 'Météo / ' + route.params.city,
            headerTintColor: screenOptions.headerTintColor,
            headerStyle: { backgroundColor: screenOptions.headerStyle.backgroudColor}
        }
    }

    return (
        <Stack.Navigator headerMode="screen" screenOptions={screenOptions} initialRouteName="Search">
            <Stack.Screen name="Search" component={Search} options={searchOption}  />
            <Stack.Screen name="Result" component={Result} options={resultOption}/>
        </Stack.Navigator>
    )
}


export class Search extends Component {

    static icon = (focused, size, color) => {
        return <Ionicons name={focused ? 'ios-search' : 'ios-search'} size={size} color={color}/>
    }
    
    state = {
        city: 'Montpellier'
    }

    setCity = (city) => {
        this.setState({city: city })
    }

    submit = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('Result', {city: this.state.city});
    }

    render() {
        return (
            <View style={style.view}>
                <TextInput 
                        underlineColorAndroid='transparent' 
                        style={style.inputText}
                        value={this.state.city}
                        onChangeText={city => this.setCity(city)} 
                        onSubmitEditing={() => this.submit()} 
                        />
                <Button color={style.button.color} onPress={() => this.submit()} title="Rechercher" />
            </View>
        )
    }
}





export default SearchStack;
