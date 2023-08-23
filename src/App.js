import './App.css';
import { ChatComponent } from '@opencui/copilot-react';
// import CustomChatComponent from './custom-ui-demo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ height: '80vh', width: 500 }}>
          { /* Use ChatComponent of opencui */}
          <ChatComponent
            botURL="https://api-64b897ae0f50353c647ca60b.api-us.naturali.io/v1/en"
            contextGetter={() => {
              return {
                url: window.location.href
              };
            }}
            actionHandler={action => {
              alert(JSON.stringify(action, null, 4));
            }}
          />

          { /* Use custom compent to render the chat component */}
          {/* <CustomChatComponent /> */}
        </div>
      </header>
    </div>
  );
}

export default App;
