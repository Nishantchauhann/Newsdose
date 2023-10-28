import React from 'react'
import loading from './loading.gif'

const Loader = () => {

  return (
    <div className='text-center'>
      <img className='my-3' src={loading} alt="loading" />
    </div>
  )

}

export default Loader



