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
  // idealCategory: 'Ideal category',
  // ideal: 'Ideal',
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
    // idealCategory,
    // ideal: getRandomValue(traits.ideal[idealCategory])
  }
}

class NPC extends Component {
  constructor(props) {
    super(props)
    const initialNpc = generateRandomTraits()
    this.state = {
      npc: initialNpc,
      workingNpc: { ...initialNpc },
      isEditing: false
    };
  }

  randomizeIndividualTrait = traitName => {
    this.setState(prevState => {
      const currentNpc = prevState.npc
      // if (traitName === "ideal") {
      //   const newNpc = generateRandomTraits(prevState.npc.idealCategory)
      //   const { ideal, idealCategory } = newNpc
      //   return {
      //     npc: {
      //       ...currentNpc,
      //       ideal,
      //       idealCategory
      //     }
      //   }
      // } else if (traitName === "idealCategory") {
      //   const newNpc = generateRandomTraits()
      //   const { ideal, idealCategory } = newNpc
      //   return {
      //     npc: {
      //       ...currentNpc,
      //       ideal,
      //       idealCategory
      //     }
      //   }
      // } else {
      const newNpc = generateRandomTraits(prevState.npc.idealCategory)
      return {
        workingNpc: {
          ...currentNpc,
          [traitName]: newNpc[traitName]
        }
      }
      // }
    })
  }

  render() {
    return (
      <div className='npc-card'>
        <button onClick={() => {
          const newNpc = generateRandomTraits()
          this.setState({ npc: newNpc, workingNpc: { ...newNpc } })
        }}>Midlife Crisis</button>
        {this.state.isEditing ?
          <>
            <button onClick={() => {
              this.setState({ isEditing: false, npc: { ...this.state.workingNpc } })
            }}>Save</button>
            <button onClick={() => this.setState({ isEditing: false, workingNpc: { ...this.state.npc } })}>Discard</button>
          </>
          :
          <button onClick={() => this.setState({ isEditing: true })}>✏️</button>
        }
        <div className="traits">
          {Object.keys(this.state.npc).map(traitName => {
            return (
              <div key={traitName} className="trait-row">
                <div className="trait-name">{traitToHuman[traitName]}</div>
                <div className="trait-value">
                  {this.state.isEditing ?
                    <>
                      <select name={traitName} value={this.state.workingNpc[traitName]} onChange={e => {
                        this.setState({
                          workingNpc: {
                            ...this.state.workingNpc,
                            [traitName]: e.target.value
                          }
                        })
                      }}>
                        {traits[traitName].map(t => {
                          return <option key={t} value={t}>{t}</option>
                        })}
                      </select>
                      <button onClick={() => this.randomizeIndividualTrait(traitName)}>?</button>
                    </>
                    :
                    <div>{this.state.npc[traitName]}</div>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}


export default NPC