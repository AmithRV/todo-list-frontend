import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTaskDetails } from '../helpers/request';
import moment from 'moment';

function Detailspage({ isVisible, taskId, onClose }) {
    const [taskDetails, setTaskDetails] = useState();

    useEffect(() => {
        if (taskId) {
            getTaskDetails({ setTaskDetails, taskId });
        }
    }, [taskId])

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

                        <div className='details-header' style={{ marginTop: '15px' }}>
                            <h3>{taskDetails?.value}</h3>

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
                            <h4 style={{ margin: '0' }}>Description</h4>
                            <textarea value={(taskDetails?.description) ? (taskDetails?.description) : ('')} readOnly />
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