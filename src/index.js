import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ConversationContextComponent from './component/Context/conversationContext';

import PeerContextComponent from './component/Context/peerContext';
import UserInfoContextComponent from './component/Context/userInfoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConversationContextComponent>
      <UserInfoContextComponent>
        <PeerContextComponent>
          <App />
        </PeerContextComponent>
      </UserInfoContextComponent>
    </ConversationContextComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
