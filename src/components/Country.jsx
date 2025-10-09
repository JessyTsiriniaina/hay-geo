import React from 'react'

export const Country = ({name, handleShow}) => {
  return (
    <div 
      onClick={handleShow}
      className='cursor-pointer py-2 px-4 hover:bg-blue-200'
    >
      {name}
    </div>
  )
}
