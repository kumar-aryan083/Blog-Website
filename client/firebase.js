import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCCXh2pPZItXXObtQwhgisBH_DqG-skiQI",
    authDomain: "bloggingwebsite-1b1ca.firebaseapp.com",
    projectId: "bloggingwebsite-1b1ca",
    storageBucket: "bloggingwebsite-1b1ca.appspot.com",
    messagingSenderId: "532782617694",
    appId: "1:532782617694:web:4018e04fd771b15acf50cf",
    measurementId: "G-7LSME911HW"
  };

const app = initializeApp(firebaseConfig);

export default app;