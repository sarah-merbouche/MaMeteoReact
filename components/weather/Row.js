import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import moment from 'moment';
import 'moment/locale/fr';
import FadeInView from '../animations/FadeInView';

moment.locale('fr');

class Row extends Component {


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
        const {item, index} = this.props;

        if(index === 0){
            return (
                <FadeInView delay={index * 50} >
                    <View style={[style.view, style.flex, style.firstView]}>
                        <View>
                            <Text style={{color:'#fff'}}>{this.day()} {this.date()}</Text>
                            {this.icon(90)}
                        </View>
                        <Text style={[style.temp, {fontSize:35}]}>{Math.round(item.temp.day,0)}°C</Text>
                    </View>
                </FadeInView>
            )
        } else {
            return (
                <FadeInView delay={index * 50}>
                    <View style={[style.view, style.flex]}>
                        <View style={style.flex}>
                            {this.icon(42)}
                            <Text style={{marginLeft:10}}>{this.day()} {this.date()}</Text>
                        </View>
                    
                    
                    
                        <Text style={style.temp}>{Math.round(item.temp.day,0)}°C</Text>
                    </View>
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
    flex: {
        flex: 1,
        flexDirection: 'row',
        
        alignItems: 'center'
    },
    firstView: {
        backgroundColor: '#e54b65',
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