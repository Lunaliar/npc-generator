import React from 'react'
import {useState} from 'react'
import NPC from './NPC'
import {ImUserPlus} from 'react-icons/im'
import {uuid} from 'uuidv4'
function Generator() {
  const [npcs, setNpcs] = useState([])

  const clickHandler = () => {
    setNpcs([...npcs])
  }
  return (
    <div className="npc-generator">
      <div className="npc-list">
        {npcs &&
          npcs.map(n => {
            return <NPC key={n} />
          })}
        <div className="add-npc" title="Add NPC">
          <button onClick={clickHandler}>
            <ImUserPlus size={150} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Generator

// Tasks
// we have lists of data
// we want to be able to randomly choose an item from each list
// for some of the more complicated ones (ideals), we even want to randomly choose which category, and THEN which item from that category

// if someone is unhappy with a characteristic, we could allow them to randomly just change that characteristic
// we could even allow them to specifically pick the characteristic from our list as well

// in the future, we might want the ability to do multiple of these simultaneously

// stretch goals:
// make the ideal look different stylistically depending on what category it is
// use Material UI to make it look sick
// query a name API for character names
// query a animal API for pets
// use localStorage to save characteristics (and view later)
