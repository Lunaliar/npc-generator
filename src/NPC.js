import React, {useState} from 'react'
import * as traits from './traits'

/** Get random integer from inclusive range */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
    lowStat: getRandomValue(traits.lowStat),
    highStat: getRandomValue(traits.highStat),
    // idealCategory,
    // ideal: getRandomValue(traits.ideal[idealCategory])
  }
}

function generateNpc(name) {
  return {
    name,
    traits: generateRandomTraits(),
  }
}

function NPC() {
  const initialNpc = generateNpc('Simp')
  const [state, setState] = useState({
    npc: initialNpc,
    workingNpc: {...initialNpc},
    isEditing: false,
  })

  const randomizeIndividualTrait = traitName => {
    setState(prevState => {
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
      const newNpc = generateNpc(prevState.npc.name)
      return {
        ...state,
        workingNpc: {
          ...currentNpc,
          [traitName]: newNpc[traitName],
        },
      }
      // }
    })
  }

  return (
    <div className="npc-card">
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
                            [traitName]: e.target.value,
                          },
                        })
                      }}
                    >
                      {traits[traitName].map(t => {
                        return (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        )
                      })}
                    </select>
                    <button onClick={() => randomizeIndividualTrait(traitName)}>
                      ?
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
                setState({...state, npc: newNpc, workingNpc: {...newNpc}})
              }}
            >
              Midlife Crisis
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
          <button onClick={() => setState({...state, isEditing: true})}>✏️</button>
        )}
      </div>
    </div>
  )
}

export default NPC
