import logo from './logo.svg';
import './App.css';

import { scaleBand, scaleLinear} from 'd3'

import { useData } from './useData'

const margin = {
  top: 65,
  left: 30,
  bottom: 20,
  right: 220,
};
const textOffset = 50

const innerHeight =
  window.innerHeight - margin.top - margin.bottom;
const innerWidth =
  window.innerWidth - margin.left - margin.right;

function App() {
  const data = useData()
  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          { data? "\nLoaded" : "Nah" }
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
    </div>
  );
}

export default App;
