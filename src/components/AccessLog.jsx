import React from 'react'

function AccessLog() {
    return (
        <>
            <div className="hash-modal-modal-wrap" >
                <div className="hash-modal-modal">
                    <div className="hash-modal-modal-header">
                        <img
                            src="./icons/close.svg"
                            className='close-icon'
                            alt={'icon'}
                        />
                    </div>

                    <div className='details-body' style={{ marginRight: '10px' }}>
                        <h4 style={{ margin: '0' }}>Access Log</h4>
                        <div className='access-log-canvas'>
                            <div className='access-log'>
                                <label>Kunduparamba, Kozhikode, 673010</label>
                            </div>

                            <div className='access-log'>
                                <label>Mavoor Road, Kozhikode, 673010</label>
                            </div>

                            <div className='access-log'>
                                <label>Cyberpark, Kozhikode, 673010</label>
                            </div>

                            <div className='access-log'>
                                <label>Kunduparamba, Kozhikode, 673010</label>
                            </div>

                            <div className='access-log'>
                                <label>Mavoor Road, Kozhikode, 673010</label>
                            </div>

                            <div className='access-log'>
                                <label>Cyberpark, Kozhikode, 673010</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="modal-backdrop"></div>

        </>
    )
}

export default AccessLog