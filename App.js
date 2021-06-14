import React,{Component} from 'react';
 import {YellowBox} from 'react-native'
import Route from './app/Route';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
  'Require cycle:',
]);
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()

class App extends React.Component {
    constuctor(props) {}
    render() {
        return (
            <Route/>
        );
    }
};

export default App;
