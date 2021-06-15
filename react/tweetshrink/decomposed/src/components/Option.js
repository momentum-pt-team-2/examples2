import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
    render() {
        const { id, label, action } = this.props;
        return (
            <label htmlFor={id}>
                <input type="checkbox" id={id} onChange={action} />
                {" " + label}
            </label>
        )
    }
}

Option.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    action: PropTypes.func
}

export default Option;
