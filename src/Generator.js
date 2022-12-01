import React from 'react'
import {useState} from 'react'
import NPC from './NPC'
import {ImUserPlus} from 'react-icons/im'
function Generator() {
  const [npcs, setNpcs] = useState([])
  const [input, setInput] = useState('')
  const handleKey = e => {
    if (e.code === 'Enter') handleSubmit()
  }
  const handleSubmit = () => {
    setNpcs(prevNPCS => [...prevNPCS, {name: input, id: prevNPCS.length}])
    setInput('')
  }
  const deleteNPC = id => {
    const updatedNPCs = npcs.filter(npc => npc.id !== id)
    setNpcs(updatedNPCs)
  }

  return (
    <div className="npc-generator">
      <div className="title-bar">
        <header>
          <p>NPC Generator</p>
          <span>Made with ❤️ by Sav, Lino, and Jake</span>
        </header>
        <div title="Add NPC">
          <ImUserPlus className="icon" onClick={handleSubmit} />
          <input
            placeholder="Give me a name..."
            type="text"
            onKeyDown={e => handleKey(e)}
            required
            onChange={e => setInput(e.target.value)}
            value={input}
          />
        </div>
      </div>
      <div className="npc-list">
        {npcs &&
          npcs.map(npc => {
            return (
              <NPC key={npc.id} name={npc.name} deleteNPC={deleteNPC} id={npc.id} />
            )
          })}
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
