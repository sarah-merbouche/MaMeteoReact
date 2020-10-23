import React, { Component } from 'react'
import { View, Text, ActivityIndicator, FlatList, SafeAreaView  } from 'react-native'
import style from '../Styles'
import axios from 'axios';
import Row from './weather/Row';


  
class Result extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             city: props.route.params.city,
             selectedIndex: 0,
             report: []//[{"dt":1603364400,"sunrise":1603346851,"sunset":1603385400,"temp":{"day":19,"min":17.06,"max":19,"night":17.31,"eve":17.6,"morn":17.06},"feels_like":{"day":15.37,"night":12.83,"eve":15.28,"morn":12.28},"pressure":1018,"humidity":88,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":8.56,"deg":118,"clouds":90,"pop":0.64,"rain":3.21},{"dt":1603450800,"sunrise":1603433328,"sunset":1603471707,"temp":{"day":19.24,"min":16.04,"max":20.21,"night":16.04,"eve":18.01,"morn":16.91},"feels_like":{"day":20.05,"night":12.98,"eve":15.53,"morn":14.36},"pressure":1016,"humidity":79,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":1.41,"deg":101,"clouds":57,"pop":0.94,"rain":11.21},{"dt":1603537200,"sunrise":1603519804,"sunset":1603558016,"temp":{"day":18.86,"min":13.35,"max":18.86,"night":14.17,"eve":15.06,"morn":13.35},"feels_like":{"day":17.5,"night":13.49,"eve":12.78,"morn":9.4},"pressure":1020,"humidity":47,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":1.05,"deg":306,"clouds":0,"pop":0.15},{"dt":1603623600,"sunrise":1603606281,"sunset":1603644326,"temp":{"day":16.85,"min":12.37,"max":16.85,"night":14.6,"eve":15.96,"morn":12.47},"feels_like":{"day":13.01,"night":10.65,"eve":12.87,"morn":8.91},"pressure":1012,"humidity":82,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.18,"deg":134,"clouds":84,"pop":0.6,"rain":2.59},{"dt":1603710000,"sunrise":1603692759,"sunset":1603730637,"temp":{"day":14.56,"min":10.71,"max":14.56,"night":11.26,"eve":12.1,"morn":10.71},"feels_like":{"day":7.51,"night":4.54,"eve":5.86,"morn":7.33},"pressure":1008,"humidity":55,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":8.64,"deg":292,"clouds":23,"pop":0.51,"rain":0.53},{"dt":1603796400,"sunrise":1603779236,"sunset":1603816950,"temp":{"day":15.6,"min":10,"max":15.6,"night":10.36,"eve":11.52,"morn":10},"feels_like":{"day":8.31,"night":5.73,"eve":6.01,"morn":2.18},"pressure":1013,"humidity":40,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":8.04,"deg":317,"clouds":0,"pop":0},{"dt":1603882800,"sunrise":1603865714,"sunset":1603903264,"temp":{"day":18.6,"min":9.41,"max":18.9,"night":13.89,"eve":15.17,"morn":9.64},"feels_like":{"day":14,"night":10.29,"eve":11.4,"morn":7},"pressure":1018,"humidity":50,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":5.9,"deg":315,"clouds":8,"pop":0},{"dt":1603969200,"sunrise":1603952192,"sunset":1603989579,"temp":{"day":18.67,"min":11.8,"max":18.67,"night":14.11,"eve":15.27,"morn":11.8},"feels_like":{"day":17.74,"night":12.44,"eve":14.56,"morn":8.11},"pressure":1024,"humidity":47,"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"speed":0.37,"deg":316,"clouds":11,"pop":0},{"dt":1604055600,"sunrise":1604038671,"sunset":1604075895,"temp":{"day":17.01,"min":11.72,"max":17.01,"night":13.48,"eve":14.1,"morn":11.72},"feels_like":{"day":15.31,"night":12.89,"eve":13.95,"morn":9.24},"pressure":1024,"humidity":60,"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"speed":2.18,"deg":100,"clouds":29,"pop":0},{"dt":1604142000,"sunrise":1604125149,"sunset":1604162213,"temp":{"day":16.09,"min":11.32,"max":16.09,"night":14.92,"eve":14.87,"morn":11.32},"feels_like":{"day":14.76,"night":14.46,"eve":14.78,"morn":9.19},"pressure":1023,"humidity":74,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"speed":2.55,"deg":81,"clouds":70,"pop":0.02}]
        }
        
    }
    
    componentDidMount(){
        this.fetchWeather();
    }

    fetchWeather = () => {
        let config = {
            headers: {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "2da3ee2216mshcbae7d5df7331fbp12c951jsn145346aa5968",
                "useQueryString": true 
            }
        };

        let url = 'https://rapidapi.p.rapidapi.com/forecast/daily?q=' + this.state.city + '&cnt=10&units=metric';
        axios.get(url, config).then(res =>  {            
            if(res.data && res.data.cod === "200"){
                this.setState({
                    report: res.data.list
                })
            } else {
                throw 'Pas de données';
            }
            
        }).catch(err => {
            console.error(err);
        })
    }


    onPressItem(index){
        this.setState({selectedIndex: index})
    }

    OnTouchItem(index){
        console.log('OnTouchItem', index);
        this.setState({selectedIndex: index})
    }

    render() {
        if(this.state.report === null){
            return <ActivityIndicator color={style.color} size="large" />
        }
        else {

            return (
                <SafeAreaView>
                    <FlatList
                        data={this.state.report}
                        keyExtractor={item => item.dt.toString()}
                        renderItem={(row) => (
                            <Row 
                                item={row.item} 
                                index={row.index} 
                                selectedIndex={this.state.selectedIndex}
                                onPressItem={(index) => this.onPressItem(index)}
                                />)}
                        onTouchEnd={() => console.log('TouchEnd')}
                    />
                </SafeAreaView>
            )
        }
        
    }
}

export default Result
