import React, {Component} from 'react'
import NPC from './NPC'

class Generator extends Component {
  render() {
    return (
      <div className="npc-list">
        <NPC />
      </div>
    )
  }
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
