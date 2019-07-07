import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Web3Interface from './Web3Interface.js'

import Start from './Start.js';
import Create from './Create.js';
import CreatePDF from './CreatePDF.js'
import Delete from './Delete.js';
import Check from './Check.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3Interface: new Web3Interface(),
    }
  }

  render() {
    /*
      Hier werden die Routen angelegt. Diese Routen sind zum Navigieren der einzelnen Fenster gut. Zum Beispiel ist "/"
      das Wurzelverzeichnis und rendert die component "Start" (oben importiert) und übergibt das web3 Objekt als property.
      Die anderen Routen sind erst sichtbar wenn sie betreten werden. In der Start component werden diese Routen angesprochen
      durch Links. Hier werden diese Routen also nur registriert.
    */
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Start web3Interface={this.state.web3Interface}/>} />
          <Route exact path="/create" render={() => <Create web3Interface={this.state.web3Interface}/>} />
          <Route exact path="/createpdf" render={() => <CreatePDF web3Interface={this.state.web3Interface}/>} />
          <Route exact path="/delete" render={() => <Delete web3Interface={this.state.web3Interface}/>} />
          <Route exact path="/check" render={() => <Check web3Interface={this.state.web3Interface}/>} />
        </div>
      </BrowserRouter>
    </div>
  );
}
}

export default App;
