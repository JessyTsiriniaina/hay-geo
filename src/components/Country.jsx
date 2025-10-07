import React from 'react'

export const Country = ({name, handleShow}) => {
  return (
    <div>{name} <button onClick={handleShow}>Show</button></div>
  )
}
