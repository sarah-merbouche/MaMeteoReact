import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from '../Styles';

class About extends Component { 

    static icon = (focused, size, color) => {
        return <Ionicons name={focused ? 'ios-list-box': 'ios-list'} size={size} color={color}/>
    }

    search = () => {
        this.props.navigation.navigate('Search')
    }

    render() {
        return (
            <View style={style.view}>
                <Text style={style.title}>A propos de l'application</Text>
                <Text>Ad laboris cupidatat nostrud eiusmod Lorem culpa occaecat excepteur consectetur aliqua laboris sint ex labore. Anim nostrud ad elit sint pariatur laborum duis duis. Cupidatat deserunt adipisicing ea anim aliqua nostrud Lorem ea in anim laborum.</Text>
                <Button color={style.button.color} onPress={() => this.search()} title="Rechercher une ville"/>
            </View>
        )
    }
}


export default About;