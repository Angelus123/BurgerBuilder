import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

// The proper way to import firebase is as such:

import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage
// import registerServiceWorker from './registerServiceWorker';

const config = {
    apiKey: "AIzaSyBHpl-SH4Om-sRzM5s1w5gGU06rOKUx1II",
    authDomain: "react-notes-b701b.firebaseapp.com",
    databaseURL: "https://react-notes-b701b.firebaseio.com",
    projectId: "react-notes-b701b",
    storageBucket: "react-notes-b701b.appspot.com",
    messagingSenderId: "914926163606",
    appId: "1:914926163606:web:d0ae0937faa3bdd17354b7",
    measurementId: "G-E9QXELZJX0"
}
// firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
