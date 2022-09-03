import React, { Component } from 'react'
import * as traits from "./traits"

/** Get random integer from inclusive range */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValue(values) {
  return values[getRandomInt(0, values.length - 1)]
}

const traitToHuman = {
  appearance: 'Appearance',
  aesthetic: 'Aesthetic',
  talent: 'Talent',
  mannerism: 'Mannerism',
  interaction: 'Interaction',
  bond: 'Bond',
  flaw: 'Flaw',
  fear: 'Fear',
  zodiac: 'Zodiac',
  lowStat: 'Low stat',
  highStat: 'High stat',
  idealCategory: 'Ideal category',
  ideal: 'Ideal',
}

function generateRandomTraits(idealCategory = getRandomValue(traits.idealCategories)) {
  return {
    appearance: getRandomValue(traits.appearance),
    aesthetic: getRandomValue(traits.aesthetic),
    talent: getRandomValue(traits.talent),
    mannerism: getRandomValue(traits.mannerism),
    interaction: getRandomValue(traits.interaction),
    bond: getRandomValue(traits.bond),
    flaw: getRandomValue(traits.flaw),
    fear: getRandomValue(traits.fear),
    zodiac: getRandomValue(traits.zodiac),
    lowStat: getRandomValue(traits.lowStat),
    highStat: getRandomValue(traits.highStat),
    idealCategory,
    ideal: getRandomValue(traits.ideal[idealCategory])
  }
}

class NPC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      npc: generateRandomTraits()
    };
  }

  randomizeIndividualTrait = traitName => {
    this.setState(prevState => {
      const currentNpc = prevState.npc
      if (traitName === "ideal") {
        const newNpc = generateRandomTraits(prevState.npc.idealCategory)
        const { ideal, idealCategory } = newNpc
        return {
          npc: {
            ...currentNpc,
            ideal,
            idealCategory
          }
        }
      } else if (traitName === "idealCategory") {
        const newNpc = generateRandomTraits()
        const { ideal, idealCategory } = newNpc
        return {
          npc: {
            ...currentNpc,
            ideal,
            idealCategory
          }
        }
      } else {
        const newNpc = generateRandomTraits(prevState.npc.idealCategory)
        return {
          npc: {
            ...currentNpc,
            [traitName]: newNpc[traitName]
          }
        }
      }
    })
  }

  render() {
    return (
      <>
        <button onClick={() => this.setState({ npc: generateRandomTraits() })}>Midlife Crisis</button>
        <div className='NPC'>
          {Object.keys(this.state.npc).map(traitName => {
            return <div key={traitName} className="trait">
              <button onClick={() => this.randomizeIndividualTrait(traitName)}>?</button>
              <div>{traitToHuman[traitName]}</div>
              <div>{this.state.npc[traitName]}</div>
            </div>
          })}
        </div>
      </>
    )
  }
}


export default NPC