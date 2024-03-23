import React, { useReducer } from 'react'
import { usePostOrderMutation } from '../state/pizzaApi'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'
const SET_ERROR = 'SET_ERROR'


const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  
}


const reducer = (state, action) => {
  switch (action.type){
    case CHANGE_INPUT:
      return { ...state, [action.payload.name]: action.payload.value}
    case RESET_FORM:
      return initialFormState
    case SET_ERROR:
      return { ...state, postOrderError: action.payload }
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [postOrder, { error: postOrderError }] = usePostOrderMutation()


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { fullName, size } = state
      if (!fullName || !size) {
        throw new Error('Full name and size are required');
      }
      const toppings = Object.entries(state)
        .filter(([key, value]) => key !== 'fullName' && key !== 'size' && value === true)
        .map(([key]) => key);

      const payload = {
        fullName,
        size,
        toppings,
      };

      const result = await postOrder(payload).unwrap();

    dispatch({ type: RESET_FORM });
    } catch (error) {
      let errorMessage;
      if (!state.fullName && !state.size) {
        errorMessage = 'Full name and size are required'
      } else if (!state['fullName']) {
        errorMessage = 'Full name is required'
      } else {
        errorMessage = 'Size is required'
      }
      dispatch({ type: SET_ERROR, payload: errorMessage })
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const payload = type === 'checkbox' ? checked : value;
    dispatch({ type: CHANGE_INPUT, payload: { name, value: payload } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {false && <div className='pending'>Order in progress...</div>}
      {postOrderError && <div className='failure'>{'Order failed: ' + postOrderError}</div>}


      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={handleChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={state['1']} onChange={handleChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={state['2']} onChange={handleChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={state['3']} onChange={handleChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={state['4']} onChange={handleChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={state['5']} onChange={handleChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
