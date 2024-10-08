import React from 'react'
import Home from './Home'
import './playing.css'

const Playing = ({playingItems}) => {
  return (
    <>
        <div className="playing">
            <Home playingItems={playingItems}/>
        </div>
    </>
  )
}

export default Playing