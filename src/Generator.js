import React, { Component } from 'react';
import NPC from './NPC';
import * as traits from "./traits"

class Generator extends Component {
  constructor(props) {
    super(props)
    this.renderNPC = this.renderNPC.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  renderNPC() {
    /**TODO display data of npc */
    return (<NPC />)
  }

  clickHandler() {

  }

  render() {
    return (
      <div className='Generator'>
        <h1>NPC Generator</h1>
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
// use Material UI to make it look sick
// query a name API for character names
// query a animal API for pets