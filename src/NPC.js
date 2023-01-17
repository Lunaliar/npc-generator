import React, { useState } from "react"
import * as traits from "./traits"
import { GiPerspectiveDiceSixFacesRandom, GiCheckMark } from "react-icons/gi"
import { BsTrashFill } from "react-icons/bs"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { CiEdit } from "react-icons/ci"

function getRandomValue(values) {
  const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return values[getRandomInt(0, values.length - 1)]
}

const toCapitalize = word => {
  return word.charAt(0).toUpperCase().concat(word.slice(1))
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
    highStat: getRandomValue(traits.highStat),
    lowStat: getRandomValue(traits.lowStat),
    zodiac: getRandomValue(traits.zodiac),
  }
}

function generateNpc(name) {
  return {
    name,
    traits: generateRandomTraits(),
  }
}

function NPC({ name, deleteNPC, id }) {
  const initialNpc = generateNpc(name)
  const [state, setState] = useState({
    npc: initialNpc,
    workingNpc: { ...initialNpc },
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

  const randomizeAll = () => {
    const newNpc = generateNpc(state.workingNpc.name)
    return setState({
      ...state,
      npc: newNpc,
      workingNpc: { ...newNpc },
    })
  }

  const selectTrait = (e, traitName) => {
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
  }

  const changeName = e => {
    return setState(prevState => ({
      ...state,
      workingNpc: { ...prevState.workingNpc, name: e.target.value },
    }))
  }

  const save = () =>
    setState({ ...state, isEditing: false, npc: { ...state.workingNpc } })

  const discard = () =>
    setState({ ...state, isEditing: false, workingNpc: { ...state.npc } })

  const editToggle = () => setState({ ...state, isEditing: true })

  return (
    <div className="npc-card">
      <div className="name-container">
        {state.isEditing ? (
          <>
            <input
              value={state.workingNpc.name}
              onChange={e => changeName(e)}
              placeholder="What's my name?"
              className="edit-name"
            />
            <GiPerspectiveDiceSixFacesRandom
              title="Randomize"
              onClick={randomizeAll}
            />
            <IoMdCloseCircleOutline
              className="icon"
              onClick={discard}
              title="Discard"
            />
            <GiCheckMark onClick={save} title="Save changes" />
          </>
        ) : (
          <>
            <CiEdit
              onClick={editToggle}
              title="Edit NPC"
              className="icon edit-icon"
            />
            <div className="npc-name">
              {toCapitalize(state.npc.name) || "Anonymous"}
            </div>
            <BsTrashFill
              title="Delete NPC"
              onClick={() => deleteNPC(id)}
              className="icon delete-icon"
            />
          </>
        )}
      </div>
      <div className="traits">
        {Object.keys(state.npc.traits).map(traitName => {
          return (
            <div key={traitName} className="trait-row">
              <div className="trait-items">
                {state.isEditing && (
                  <div className="trait-icon">
                    <GiPerspectiveDiceSixFacesRandom
                      onClick={() => {
                        if (!state.isEditing) return
                        randomizeIndividualTrait(traitName)
                      }}
                      size={25}
                      title="Randomize Trait"
                      className="icon randomTrait-icon"
                    />
                  </div>
                )}
                <div className="trait-name">{toCapitalize(traitName)}</div>
              </div>
              <div className="trait-value">
                {state.isEditing ? (
                  <>
                    <select
                      name={traitName}
                      value={state.workingNpc.traits[traitName]}
                      onChange={e => selectTrait(e, traitName)}
                    >
                      {traits[traitName].map(trait => {
                        return (
                          <option key={trait} value={trait}>
                            {trait}
                          </option>
                        )
                      })}
                    </select>
                  </>
                ) : (
                  <div>{state.npc.traits[traitName]}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NPC
