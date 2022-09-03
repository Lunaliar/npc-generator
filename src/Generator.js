/**

*? <Generator
      <NPC />

*? />

*/

import React, { Component } from 'react';
import NPC from './NPC';

class Generator extends Component{
  constructor(props){
    super(props)
    this.renderNPC = this.renderNPC.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  renderNPC(){
    /**TODO display data of npc */
    return(<NPC  />)
  }

  clickHandler(){

  }

  render(){
    return(
      <div className='Generator'>
        <h1>NPC Generator</h1>
        <NPC  />
      </div>
    )
  }
}
export default Generator