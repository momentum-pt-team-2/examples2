import React from 'react'
import ShrinkOption from './ShrinkOption'

class ShrinkOptions extends React.Component {
  render () {
    let { onOptionChange, textOptions } = this.props

    return (
      <div className='row options'>
        <div className='col-12'>
          <h4>Options</h4>
        </div>
        {textOptions.map((option, idx) => (
          <ShrinkOption key={idx}
            id={option.id}
            label={option.label}
            onOptionChange={onOptionChange} />
        ))}
      </div>
    )
  }
}

export default ShrinkOptions
