import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from './helpers/actions';

function App() {

  const [type, setType] = useState('');
  const [userValidationUpdated, setUserValidationUpdated] = useState(false);
  const [isValidUser, setIsValidUser] = useState();
  const [isAccessLogVisible, setIsAccessLogVisible] = useState(false);

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
    let token = getToken()?.token;

    if(token){
      setIsValidUser(true)
    }else{
      setIsValidUser(false);
    }
  }, [userValidationUpdated])

  return (
    <div className="app">
      
      <Header
        setType={setType}
        userValidationUpdated={userValidationUpdated}
        setUserValidationUpdated={setUserValidationUpdated}
        isValidUser={isValidUser}
        setIsAccessLogVisible={setIsAccessLogVisible}
      />

      <Body
        type={type}
        setType={setType}
        userValidationUpdated={userValidationUpdated}
        isValidUser={isValidUser}
        setUserValidationUpdated={setUserValidationUpdated}
        isAccessLogVisible={isAccessLogVisible}
        setIsAccessLogVisible={setIsAccessLogVisible}
      />

      <Footer />
    </div>
  );
}

export default App;
