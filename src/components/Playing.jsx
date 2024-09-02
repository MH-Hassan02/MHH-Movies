import React from 'react'
import Home from './Home'
import './playing.css'

const Playing = ({playingItems}) => {
  return (
    <>
        <div className="playing container">
            <h1>Playing Now</h1>
            <Home playingItems={playingItems}/>
        </div>
    </>
  )
}

export default Playing