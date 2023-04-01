import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { getBackgroundImageUrl } from './helpers/request';
import Pusher from 'pusher-js';

function App() {
  var pusher = new Pusher('100e80424f5d4e59467f', { cluster: 'ap2' });

  var channel = pusher.subscribe('my-channel');

  const [type, setType] = useState('');

  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  function sendNotification(task) {

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(task.value);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(task.value);
          }
        });
      }
    }
  }


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '+') {
        setType('add');
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, []);

  useEffect(() => {
    channel.bind('my-event', function (data) {
      sendNotification(data.data);
    });
  }, [])

  useEffect(() => {
    getBackgroundImageUrl(setBackgroundImageUrl);
  }, [backgroundImageUrl])

  return (
    <div className="app">
      <Header
        setType={setType}
      />

      <Body
        type={type}
        setType={setType}
        setBackgroundImageUrl={setBackgroundImageUrl}
        backgroundImageUrl={backgroundImageUrl}
      />

      <Footer />
    </div>
  );
}

export default App;
