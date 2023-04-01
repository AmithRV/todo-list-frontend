import { toast } from 'react-toastify';
import axios from '../helpers/axios';

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

const updatListItem = (itemId, isCompleted) => {

    axios.patch('/update-item', {
        data: {
            id: itemId,
            isCompleted: !isCompleted
        }
    }).then(() => {
    }).catch(() => {
        toast.error('Error while updating.');
    }).finally(() => { })
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

export { getTodoList, addTasktoList, updatListItem, removeItemFromList, addBackgroundImage, getBackgroundImageUrl, getTaskDetails };