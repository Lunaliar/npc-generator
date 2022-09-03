import React, { Component } from 'react'

class NPC extends Component{
  constructor(props){
    super(props)
    this.mathRand = this.mathRand.bind(this)
  }

  mathRand(arr){
    return arr[Math.floor(Math.random()*arr.length)]
  }

  render(){
    const looks= [
      'Distinctive jewelry: earrings, necklace circlet, bracelets',
      'Piercings',
      'Flamboyant or outlandish clothes',
      'Formal, clean clothes',
      'Ragged, dirty clothes',
      'Pronounced scar',
      'Missing teeth',
      'Unusual eye color or heterochromia',
      'Tattoos',
      'Birthmark',
      'Unusual Skin Color',
      'Bald',
      'Braided bear or hair',
      'Unusual hair color',
      'Nervous eye twitch',
      'Distinctive nose',
      'Distinct posture',
      'Exceptionally beautiful',
      'Exceptionally ugly'
    ]
    return(
      <div className='NPC'>

        <div>Appearance: {this.mathRand(looks)}</div>
      </div>
    )
  }
}

export default NPC