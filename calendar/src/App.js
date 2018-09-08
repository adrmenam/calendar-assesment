import React, { Component } from 'react';
import InputForm from './components/InputForm.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="title">
            <span>Calendar</span>
          </div>
        </header>
        <main>
          <InputForm /> 
        </main>
      </div>
    );
  }
}

export default App;
