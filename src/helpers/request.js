import { toast } from 'react-toastify';
import axios from '../helpers/axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('100e80424f5d4e59467f', { cluster: 'ap2' });
const channel = pusher.subscribe('my-channel');

const getTodoList = (setLoading, setList) => {
    setLoading(true);
    axios.get('/list')
        .then((response) => {
            setList(response?.data);
        })
        .catch(() => {
            toast.error('something went wrong.');
        })
        .finally(() => {
            setLoading(false);
        })
}

const addTasktoList = (data, setType) => {
    axios.post(`/add-to-list`, data)
        .then(() => {
        }).catch(() => {
            toast.error('something went wrong.');
        }).finally(() => {
            setType('');
        })
}

const updatListItem = (itemId, isCompleted, onUpdate, setIsUpdating) => {
    setIsUpdating(true);
    
    axios.patch('/update-item', {
        data: {
            id: itemId,
            isCompleted: isCompleted
        }
    }).then(() => {
        onUpdate();
    }).catch(() => {
        toast.error('Error while updating.');
    }).finally(() => {
        setIsUpdating(false);
     })
};

const removeItemFromList = (itemId) => {
    axios.delete(`/remove-item/${itemId}`).then(() => {
    }).catch(() => {
        toast.error('Error while deleting.');
    }).finally(() => {
    })
}

const addBackgroundImage = (url, setBackgroundImageUrl, setType, setIsLoading) => {
    setIsLoading(true);
    axios.post('/add-background-image', {
        data: {
            url: url,
        }
    }).then(() => {
        setBackgroundImageUrl(url);
    }).catch(() => {
        toast.error('something went wrong.');
    }).finally(() => {
        setType('');
        setIsLoading(false);
    })
}

const getBackgroundImageUrl = (setBackgroundImageUrl) => {
    axios.get('/background-image')
        .then((response) => {
            setBackgroundImageUrl(response?.data?.url);
        })
        .catch(() => {
            // toast.error('something went wrong.');
        })
        .finally(() => { })
}

const getTaskDetails = ({ setTaskDetails, taskId }) => {
    axios.get(`/details/${taskId}`)
        .then((response) => {
            setTaskDetails(response?.data);
        })
        .catch(() => {
            // toast.error('something went wrong.');
        })
        .finally(() => { })
}

const sendNotification = (task)=> {
    // console.log('Notification')
    // if ('Notification' in window) {
    //   if (Notification.permission === 'granted') {
    //     new Notification(task.value);
    //   } else if (Notification.permission !== 'denied') {
    //     Notification.requestPermission().then(permission => {
    //       if (permission === 'granted') {
    //         new Notification(task.value);
    //       }
    //     });
    //   }
    // }
}

const handleNotification = (refresh, setRefresh)=>{
    channel.bind('my-event', function (data) {
        if (data.data.type === "change") {
          console.log('CHANGE');
          setRefresh(!refresh)
        } else {
          console.log('Notification')
          // sendNotification(data.data);
        }
      });
}

const signInAction = (userid,password, userValidationUpdated, setUserValidationUpdated, setIsValidating)=>{
    axios.post('/validate', {
        data: {
            userId: userid,
            password:password
        }
    }).then( (response) => {
        // Set an object to LocalStorage
        const obj = response.data;
        localStorage.setItem('todo-list', JSON.stringify(obj));
        setUserValidationUpdated(!userValidationUpdated) 
    }).catch(() => {   
    }).finally(() => {
        setIsValidating(false);
    })
}

export { 
    getTodoList, 
    addTasktoList, 
    updatListItem, 
    removeItemFromList, 
    addBackgroundImage, 
    getBackgroundImageUrl, 
    getTaskDetails,
    sendNotification,
    handleNotification,
    signInAction
};