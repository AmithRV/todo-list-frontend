import React, { useEffect, useState } from 'react'
import { getAccessLocationList } from '../helpers/request';

function AccessLog({ isVisible, onClose }) {

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getAccessLocationList(setLocations);
    }, [])

    if (isVisible) {
        return (
            <>
                <div className="hash-modal-modal-wrap" >
                    <div className="hash-modal-modal">
                        <div className="hash-modal-modal-header">
                            <img
                                src="./icons/close.svg"
                                className='close-icon'
                                alt={'icon'}
                                onClick={() => { onClose() }}
                            />
                        </div>

                        <div className='details-body' style={{ marginRight: '10px' }}>
                            <h4 style={{ margin: '0' }}>Access Log</h4>
                            <div className='access-log-canvas'>
                                {
                                    locations?.map((location) => {
                                        // console.log('location : ', location?.address?.adminArea6)
                                        return (
                                            <div className='access-log'>
                                                <label>
                                                    {location?.address?.adminArea6},&nbsp;
                                                    {location?.address?.street},&nbsp;
                                                    {location?.address?.postalCode}
                                                </label>
                                            </div>
                                        )
                                    })
                                }

                            </div>
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

export default AccessLog