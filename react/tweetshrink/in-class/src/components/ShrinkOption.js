import React from 'react'

class ShrinkOption extends React.Component {
  render () {
    const { onOptionChange, id, label } = this.props
    return (
      <div className='col-6'>
        <label htmlFor={id}>
          <input type='checkbox' id={id}
            onChange={(event) => onOptionChange(id, event)} />
          <span>{label}</span>
        </label>
      </div>
    )
  }
}

export default ShrinkOption
