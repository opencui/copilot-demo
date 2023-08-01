## Install

```bash
npm install opencui-copilot --save
```

```bash
yarn add opencui-copilot
```

## Usage

```jsx
// import sdk
import { CopilotMessageType, OpencuiCopilot, CopilotMessageCardActionType } from 'opencui-copilot';

// create client
const client = OpencuiCopilot.create({
  url: 'https://api-64b897ae0f50353c647ca60b.api-us.naturali.io/v1/en',  // Make sure you have built and deployed your own Copilot bot on the open platform, the url is the address where the bot is deployed online or privately.
  user: {
    id: 'my_user_id',
    user: 'Me'
  } // The id and name of the user who is talking to copilot locally，user.id will be used as the session id
})

// init session, connect with bot, connect successfully will receive bot greeting messages
client.connect().then(initMsgs => {
      // received greeting messages
      console.log(initMsgs);
    }).catch(err => {
      console.log(err);
    });

// send message
client.sendMessage({
        messageType: CopilotMessageType.text,
        text: 'message to bot',
        user: {
          id: 'my_user_id',
          user: 'Me'
        }
      }).then(resps => {
        // received messages from bot
        console.log(resps);
      }).catch(err => {
        console.log(err);
      });
```
`
## Try demo
You can develop the dialog container with the layout and style you need. This demo renders the dialog interface with components of ChatUI for reference only.

### run demo
`npm install && npm start`
