import { useEffect, useState } from "react";
import HashModal from "./HashModal";
import { ToastContainer } from 'react-toastify';
import { getTodoList, removeItemFromList, updatListItem } from "../helpers/request";
import Detailspage from "./Detailspage";

function Body({ type, setType, setBackgroundImageUrl, backgroundImageUrl, isDbUpdated }) {

    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItemIdForDelete, setSelectedItemIdForDelete] = useState();

    const [taskId, setTaskId] = useState();
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const updateArray = (itemId, isCompleted) => {
        setList(
            (prevArray) => {
                return prevArray.map((value) => {
                    if (value?.id === itemId) {
                        return {
                            id: value?.id,
                            value: value?.value,
                            isCompleted: !isCompleted
                        };
                    } else {
                        return value;
                    }
                });
            });

        updatListItem(itemId, isCompleted);

    };

    const removeItem = (itemId) => {
        removeItemFromList(itemId);
        const updatedItems = list.filter(item => item?.id !== itemId);
        setList(updatedItems);
    }

    useEffect(() => {
        console.log('isDbUpdated : ', isDbUpdated)
        getTodoList(setLoading, setList);
    }, [refresh, isDbUpdated])

    return (
        <>
            <ToastContainer pauseOnHover={false} />

            <div className="body-wrap" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>

                <div className="body">
                    <div className="cardlist">

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
                                            onChange={(e) => { updateArray(item?.id, item?.isCompleted) }}
                                            checked={(item?.isCompleted) ? (item?.isCompleted) : ('')}
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
            />
        </>
    )
}

export default Body