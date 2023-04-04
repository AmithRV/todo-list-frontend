import React, { useState } from 'react'
import { signInAction } from '../helpers/request';

function SignIn({ userValidationUpdated, setUserValidationUpdated }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const signInFunction = () => {
    setIsValidating(true);
    signInAction(userId, password, userValidationUpdated, setUserValidationUpdated, setIsValidating);
  }

  return (
    <div className='sign-in-wrap'>
      <div className='sign-in-options'>
        <label className='sign-in-option-label'>USER ID</label>
        <input
          className='sign-in-action-input'
          value={userId ? userId : ''}
          onChange={(e) => {
            setUserId(e.target.value)
          }}
        />
      </div>

      <div className='sign-in-options'>
        <label className='sign-in-option-label'>PASSWORD</label>
        <input
          className='sign-in-action-input'
          value={password ? password : ''}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>

      <div className='sign-in-actions'>
        <button
          className='validate-btn'
          onClick={signInFunction}
          disabled={isValidating}
        >
          {(isValidating) ? ('validating ...') : ('validate')}
        </button>
      </div>

    </div>
  )
}

export default SignIn