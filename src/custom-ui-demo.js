import React from 'react';
import Chat, { Bubble, Button, useMessages } from '@chatui/core';
import { MessageType, OpencuiClient, ActionType } from 'opencui';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';

const me = {
  id: 'my_user_id',
  name: 'me'
};

const client = OpencuiClient.create({
  url: 'https://api-64b897ae0f50353c647ca60b.api-us.naturali.io/v1/en',
  user: me
})

// register context getter. for example, just pass current url as app state.
client.registerContextGetter(function () {

  return {
    url: window.location.href
  };
});

//  register action handler. 
client.registerActionHandler(function (action) {

  if (action.url) {
    window.location.href = action.url;
  } else {
    alert(JSON.stringify(action, undefined, 4));
  }
});

const botAvatar = require('./copilot-bot.png')

function getAvatar(user) {
  return user.id === 'my_user_id' ? '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' : botAvatar;
}

function converMessage(copilotMsg) {

  switch (copilotMsg.messageType) {
    case MessageType.Text:
      return {
        type: 'text',
        content: { text: copilotMsg.text },
        position: copilotMsg.user.id === 'my_user_id' ? 'right' : 'left',
        user: { avatar: getAvatar(copilotMsg.user) }
      };
    case MessageType.Card:
      return {
        type: 'card',
        content: copilotMsg,
        position: copilotMsg.user.id === 'my_user_id' ? 'right' : 'left',
        user: { avatar: getAvatar(copilotMsg.user) }
      }
    default:
      return { type: 'text' };
  }
}

export default function CustomChatComponent(props) {

  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages([]);

  // init session
  React.useEffect(() => {

    client.connect().then(initMsgs => {
      for (const msg of initMsgs) {
        appendMsg(converMessage(msg))
      }
    }).catch(err => {
      console.log(err);
    });

  }, [appendMsg]);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {

      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
        user: {
          avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg'
        }
      });

      setTyping(true);

      client.sendMessage({
        messageType: MessageType.text,
        text: val,
        user: me
      }).then(resps => {
        for (const msg of resps) {
          appendMsg(converMessage(msg))
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  function handleQuickReplyClick(text) {
    handleSend('text', text);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    const media = content.richMedia;

    switch (type) {
      case 'text':
        return <Bubble content={content.text} style={{ textAlign: 'left' }} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      case 'card':
        return (
          <Bubble type="card" content={<div style={{ padding: '0 8px' }}>
            {
              content.title && <h3 key="title" style={{
                textAlign: 'left',
                margin: 4
              }}>{content.title}</h3>
            }
            {
              content.text && <pre key="text" style={{
                margin: 4,
                textAlign: 'left',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'normal',
                overflowWrap: 'anywhere'
              }}>{content.text}</pre>
            }

            {media && <img key="img" style={{ maxWidth: '100%' }} src={media.fileURL} alt={media.altText} />}
            {content.actionList && content.actionList.length ? <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: -4, marginRight: -4 }}>
              {
                content.actionList.map((action, index) => {
                  return <Button key={index} onClick={() => {
                    switch (action.actionType) {

                      case ActionType.reply:
                        handleQuickReplyClick(action.text)
                        break;
                      case ActionType.click:
                        client.executeAction(action);
                        break;
                      default:
                        alert('This action is not supported yet');
                        break;
                    }
                  }} color="primary" style={{ margin: 4 }}>{action.text}</Button>;
                })
              }
            </div> : ''
            }
          </div>} />
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      locale='en-US'
      navbar={{ title: 'Copilot' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder='Please enter...'
      {
      ...props
      }
    />
  );
}