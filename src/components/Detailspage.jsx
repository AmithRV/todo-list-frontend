import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTaskDetails, updatListItem } from '../helpers/request';
import moment from 'moment';
import Loader from '../common-components/LoadingOverlay/Loader';

function Detailspage({ isVisible, taskId, onClose }) {
    const [taskDetails, setTaskDetails] = useState();
    const [refresh, setRefresh] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const onUpdate = () => {
        setRefresh(!refresh);
    }

    const updateArray = (itemId, isCompleted) => {
        updatListItem(itemId, isCompleted, onUpdate, setIsUpdating);
    };

    useEffect(() => {
        if (taskId) {
            getTaskDetails({ setTaskDetails, taskId });
        }
    }, [taskId, refresh])

    if (isVisible) {
        return (
            <>
                <div className="hash-modal-modal-wrap" >
                    <div className="hash-modal-modal">
                        <div className="hash-modal-modal-header">
                            <img
                                src="./icons/close.svg"
                                onClick={() => {
                                    setTaskDetails();
                                    onClose();
                                }}
                                className='close-icon'
                                alt={'icon'}
                            />
                        </div>

                        <div className='details-header'>
                            <h3 style={{maxWidth:'100%', overflow:'hidden'}}>{taskDetails?.value}</h3>

                            <div>
                                {
                                    (taskDetails?.notifyAt) ? (
                                        <DatePicker
                                            selected={moment(taskDetails?.notifyAt).toDate()}
                                            dateFormat='yyyy-MM-dd hh:mm'
                                        />

                                    ) : ('')
                                }

                            </div>

                            <div className='details-header-alert'>
                                <h3>Alert </h3>
                                <div className="container">
                                    <label
                                        className="switch"
                                        style={(taskDetails?.value) ? ({ background: 'rebeccapurple' }) : ({})}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={(taskDetails?.isAlertActive) ? (taskDetails?.isAlertActive) : (false)}
                                            readOnly
                                        />
                                        <div></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='details-body'>
                            <h4 style={{ margin: '0' }}>DESCRIPTION</h4>
                            <textarea value={(taskDetails?.description) ? (taskDetails?.description) : ('')} readOnly />
                        </div>

                        <div className='details-body' style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <h4 style={{ margin: '0' }}>STATUS </h4>
                            &nbsp;&nbsp;&nbsp;
                            <select
                                style={{ fontSize: '18px' }}
                                onChange={(e) => {
                                    updateArray(taskDetails?.id, e.target.value)
                                }}
                                value={taskDetails?.isCompleted}
                            >
                                <option value={'select'}>select</option>
                                <option value={true}>COMPLETED</option>
                                <option value={false}>NOT COMPLETED</option>
                            </select>
                            {
                                (isUpdating)?(<Loader />):(<></>)
                            }
                        </div>

                    </div>


                </div>

                <div className="modal-backdrop"></div>

            </>
        )
    } else {
        return (<></>)
    }
}

export default Detailspage