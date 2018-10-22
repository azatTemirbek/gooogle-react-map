import React from 'react';
import './index.css';
import './App.css';
import {MapInput} from './Gmaps';
class App extends React.PureComponent {
    render() {
        return (
            <div style={{padding:'300px'}}>
        <MapInput
            fillInitialData = {internal=>{}}
            afterSelected = {internal=>{return {} }}
            onChange={(e)=>{ console.log(e.target) }}
            disabled={false}
            />
            </div>
        );
    }
}
export default App;

