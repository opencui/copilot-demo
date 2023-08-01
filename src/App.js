import './App.css';
import Demo from './demo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ height: '100vh', width: 500 }}>
          <Demo onCustomAction={action => {
            alert(JSON.stringify(action, null, 4));
          }} />
        </div>
      </header>
    </div>
  );
}

export default App;
