# Copilot-React
Copilot-react is a UI component based on [ChatUI](https://github.com/alibaba/ChatUI) that adds the copilot experience to any web app. To integrate this component into your web application, simply import the componetn and configure the following three properties:

1. Bot URL: Enter the URL where the Chatbot is deployed.
2. Context Getter Function: When a user's message is sent to the bot, it will invoke this function to retrieve the current frontend status before making the request. The obtained status will be sent to the bot as request parameters, enabling the bot to provide more accurate replies and actions based on the current frontend status.
3. Action Handler Function: The actions returned by the bot are displayed in the chat component as buttons. When a button is clicked, it triggers the execution of the action handler. The action's information, including its type and parameters, is passed to the action handler as a parameter. The integrator can then process this information for specific business actions.


## Install 
1. install by npm :`npm install opencui --save`
2. Install by yarn: `yarn add opencui`
   
## Use chat component 
In this example code, the context getter function simply returns the URL of the current page to represent the app state, and the action handler renders an alert that shows information about the action. In reality, you need to provide useful implementation per your copilot design.

```JavaScript
import './App.css';
import { ChatComponent } from 'opencui';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ height: '80vh', width: 500 }}>
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
        </div>
      </header>
    </div>
  );
}

export default App;
```
