import React from 'react';
import logo from './logo.svg';
import './App.css';
import StackedList from './components/StackedList'; // Importation du composant StackedList


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <h1 className="prose-base text-3xl font-bold underline">
            Hello world!
        </h1>
      {/* Utilisation du composant StackedList */}
      <StackedList />
    </div>
  );
}

export default App;
