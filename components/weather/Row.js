import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import moment from 'moment';
import 'moment/locale/fr';
import FadeInView from '../animations/FadeInView';

moment.locale('fr');

class Row extends Component {

    state = {
        selectedIndex :0
    }

    day() {
        let day = moment(this.props.item.dt *1000).format('ddd')
        return (
            <Text style={[style.white, style.bold]}>{day.toUpperCase()}</Text>
        )
    }

    date() {
        let date = moment(this.props.item.dt *1000).format('DD/MM')
        return (
            <Text>{date}</Text>
        )
    }

    icon (size){
        const type = this.props.item.weather[0].main.toLowerCase();
        let image;
        switch(type){
            case 'clouds':
                image = require('./icons/cloudy.png');
                break;
            case 'rain':
                image = require('./icons/rain.png');
                break;
            default:
                image = require('./icons/sun.png');
                break;
        }
        return <Image source={image} style={{width: size, height: size}}/>

    }

    render() {
        const {item, index, onPressItem, selectedIndex} = this.props;

        if(index === selectedIndex){
            return (
                <FadeInView delay={index * 50} >
                    <View style={[style.bigView, style.flex, style.firstView]}>
                        <View>
                            <Text style={{color:'#fff'}}>{this.day()} {this.date()}</Text>
                            {this.icon(90)}
                        </View>
                        <Text style={[style.temp, {fontSize:35}]}>{Math.round(item.temp.day,0)}°C</Text>
                    </View>
                    <View style={[style.view, style.flex, style.firstView]}>
                        <View style={style.label}>
                            <Text style={[style.white, style.bold]}>Matin</Text>
                            <Text style={style.white}>{Math.round(item.temp.morn)}°C</Text>
                            <Text style={[style.white, style.small]}>feel {Math.round(item.feels_like.morn)}°C</Text>
                        </View>
                        <View style={style.label}>
                            <Text style={[style.white, style.bold]}>Après-midi</Text>
                            <Text style={style.white}>{Math.round(item.temp.eve)}°C</Text>
                            <Text style={[style.white, style.small]}>feel {Math.round(item.feels_like.eve)}°C</Text>
                        </View>
                        <View style={style.label}>
                            <Text style={[style.white, style.bold]}>Soir</Text>
                            <Text style={style.white}>{Math.round(item.temp.night)}°C</Text>
                            <Text style={[style.white, style.small]}>feel {Math.round(item.feels_like.night)}°C</Text>
                        </View>
                    </View>
                </FadeInView>
            )
        } else {
            return (
                <FadeInView delay={index * 50}>
                    <TouchableOpacity onPress={() => onPressItem(index)}>
                        <View style={[style.view, style.flex]}>
                            <View style={style.flex}>
                                {this.icon(42)}
                                <Text style={{marginLeft:10}}>{this.day()} {this.date()}</Text>
                            </View>
                        
                        
                        
                            <Text style={style.temp}>{Math.round(item.temp.day,0)}°C</Text>
                        </View>
                    </TouchableOpacity>
                </FadeInView>
                
            )
        }
        
    }
}

export default Row


const style = StyleSheet.create({
    white: {
        color: '#FFF'
    },
    bold: {
        fontWeight: 'bold'
    },
    small: {
        fontSize: 10,
        fontWeight: '300'
    },
    flex: {
        flex: 1,
        flexDirection: 'row',
        
        alignItems: 'center'
    },
    firstView: {
        backgroundColor: '#e54b65'
    },
    label: {
        flexDirection: 'column'
    },
    bigView: {
        backgroundColor: '#394163',
        borderWidth: 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 0,
        justifyContent: 'space-between'
        
    },
    view: {
        backgroundColor: '#394163',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between'
        

    },
    temp : {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22
    }
})