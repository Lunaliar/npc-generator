import React, {useState} from 'react'
import * as traits from './traits'
import {GiPerspectiveDiceSixFacesRandom} from 'react-icons/gi'

/** Get random integer from inclusive range */
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
function getRandomValue(values) {
  const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
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

function generateRandomTraits() {
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
    highStat: getRandomValue(traits.highStat),
    lowStat: getRandomValue(traits.lowStat),
  }
}

function generateNpc(name) {
  return {
    name,
    traits: generateRandomTraits(),
  }
}

function NPC() {
  const initialNpc = generateNpc('Anonymous')
  const [state, setState] = useState({
    npc: initialNpc,
    workingNpc: {...initialNpc},
    isEditing: false,
  })

  const randomizeIndividualTrait = traitName => {
    setState(prevState => {
      const currentNpc = prevState.npc
      const newNpc = generateNpc(prevState.npc.name)
      return {
        ...state,
        workingNpc: {
          ...currentNpc,
          traits: {
            ...state.workingNpc.traits,
            [traitName]: newNpc.traits[traitName],
          },
        },
      }
    })
  }

  return (
    <div className="npc-card">
      <div className="name-container">
        {state.isEditing ? (
          <input
            value={state.workingNpc.name}
            onChange={e =>
              setState(prevState => ({
                ...state,
                workingNpc: {...prevState.workingNpc, name: e.target.value},
              }))
            }
          />
        ) : (
          <div className="npc-name">{state.npc.name}</div>
        )}
      </div>
      <div className="traits">
        {Object.keys(state.npc.traits).map(traitName => {
          return (
            <div key={traitName} className="trait-row">
              <div className="trait-name">{traitToHuman[traitName]}</div>
              <div className="trait-value">
                {state.isEditing ? (
                  <>
                    <select
                      name={traitName}
                      value={state.workingNpc[traitName]}
                      onChange={e => {
                        setState({
                          ...state,
                          workingNpc: {
                            ...state.workingNpc,
                            traits: {
                              ...state.workingNpc.traits,
                              [traitName]: e.target.value,
                            },
                          },
                        })
                      }}
                    >
                      {traits[traitName].map(t => {
                        return (
                          <option key={t} value={t} placeholder={traitName}>
                            {t}
                          </option>
                        )
                      })}
                    </select>
                    <button
                      onClick={() => {
                        randomizeIndividualTrait(traitName)
                      }}
                    >
                      <GiPerspectiveDiceSixFacesRandom />
                    </button>
                  </>
                ) : (
                  <div>{state.npc.traits[traitName]}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="controls">
        {state.isEditing ? (
          <>
            <button
              onClick={() => {
                const newNpc = generateNpc(state.workingNpc.name)
                return setState({
                  ...state,
                  isEditing: false,
                  npc: newNpc,
                  workingNpc: {...newNpc},
                })
              }}
            >
              Randomize
            </button>
            <button
              onClick={() =>
                setState({...state, isEditing: false, workingNpc: {...state.npc}})
              }
            >
              Discard
            </button>
            <button
              onClick={() => {
                setState({...state, isEditing: false, npc: {...state.workingNpc}})
              }}
            >
              Save
            </button>
          </>
        ) : (
          <div className="edit-toggle">
            <button onClick={() => setState({...state, isEditing: true})}>✏️</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NPC
