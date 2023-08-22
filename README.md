## Install 
1. install by npm :`npm install opencui --save`
2. Install by yarn: `yarn add opencui`
## Use  chat component 
Import chat component into your react app and embed it in your UI. In this example code, the url of the current page is used as an example of the app status, and the alert displays the action information as an example of processing the action. The integrator should pass in status and process actions based on the specific business requirements of the app. 

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

## Try demo
You can develop the dialog container with the layout and style you need. This demo renders the dialog interface with components of ChatUI for reference only.

### run demo
`npm install && npm run start`
