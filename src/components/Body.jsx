import { useEffect, useState } from "react";
import HashModal from "./HashModal";
import { ToastContainer } from 'react-toastify';
import { getBackgroundImageUrl, getTodoList, handleNotification, removeItemFromList } from "../helpers/request";
import Detailspage from "./Detailspage";
import SignIn from "./SignIn";
import { getToken } from "../helpers/actions";

function Body({ type, setType, userValidationUpdated, isValidUser, setUserValidationUpdated }) {

    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItemIdForDelete, setSelectedItemIdForDelete] = useState();

    const [taskId, setTaskId] = useState();
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

    const removeItem = (itemId) => {
        removeItemFromList(itemId);
        const updatedItems = list.filter(item => item?.id !== itemId);
        setList(updatedItems);
    }

    useEffect(() => {
        handleNotification(refresh, setRefresh);
    }, [refresh])

    useEffect(() => {
        if (isValidUser) {
            getTodoList(setLoading, setList);
        }
    }, [refresh, isValidUser])

    useEffect(() => {
        getBackgroundImageUrl(setBackgroundImageUrl);
    }, [])

    useEffect(() => {
        getToken()
    }, [userValidationUpdated])

    return (
        <>
            <ToastContainer pauseOnHover={false} />

            <div className="body-wrap" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>

                <div className="body">
                    <div className="cardlist">
                        {
                            (isValidUser === true) ? (
                                <>
                                    {
                                        (loading) ? (
                                            <div className="list-element">
                                                <span className="list-item-loader"></span>
                                            </div>
                                        ) : (<></>)
                                    }


                                    {
                                        list?.map((item, index) => {
                                            return (
                                                <div
                                                    className="list-element"
                                                    key={index}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id="myCheckbox"
                                                        className="checkbox"
                                                        // onChange={(e) => { updateArray(item?.id, item?.isCompleted) }}
                                                        checked={(item?.isCompleted) ? (item?.isCompleted) : ('')}
                                                        readOnly
                                                    />
                                                    <label
                                                        htmlFor="myCheckbox"
                                                        className={(item?.isCompleted) ? ("checkbox-label-line-through") : ("checkbox-label")}
                                                        onClick={() => {
                                                            setIsDetailsVisible(true);
                                                            setTaskId(item?.id);
                                                        }}
                                                    >
                                                        {item?.value}
                                                    </label>

                                                    {
                                                        (selectedItemIdForDelete === item?.id) ? (
                                                            <div className="delete-action">
                                                                <img
                                                                    src="./icons/check.svg"
                                                                    className="check-icon action-icon"
                                                                    onClick={() => { removeItem(item?.id) }}
                                                                    alt={'icon'}
                                                                />
                                                                <img
                                                                    src="./icons/close.svg"
                                                                    className="close-icon action-icon"
                                                                    onClick={() => { setSelectedItemIdForDelete('') }}
                                                                    alt={'icon'}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src="./icons/trash.svg"
                                                                className="trash-icon action-icon"
                                                                onClick={() => { setSelectedItemIdForDelete(item?.id) }}
                                                                alt={'icon'}
                                                            />
                                                        )
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            ) : (
                                (isValidUser === false) ? (
                                    <SignIn
                                        userValidationUpdated={userValidationUpdated}
                                        setUserValidationUpdated={setUserValidationUpdated}
                                    />
                                ) : (<></>)
                            )
                        }

                    </div>
                </div>
            </div >

            {
                (type === 'decrypt' || type === 'add' || type === 'chang-bg-image') &&
                <HashModal
                    type={type}
                    setType={setType}
                    setList={setList}
                    todoList={list}
                    setBackgroundImageUrl={setBackgroundImageUrl}
                    callBack={() => { setRefresh(!refresh) }}
                    backgroundImageUrl={backgroundImageUrl}
                />
            }

            <Detailspage
                isVisible={isDetailsVisible}
                taskId={taskId}
                onClose={() => {
                    setIsDetailsVisible(false);
                    setTaskId();
                }}
                setList={setList}
            />
        </>
    )
}

export default Body