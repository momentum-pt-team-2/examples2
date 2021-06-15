import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextEntry extends Component {
    render() {
        const {text, shrunkText, onUpdate} = this.props;
        return (
            <div className="TextEntry">
                <div className="row">
                    <div className="col">
                        <textarea
                            className="TextEntry-textbox"
                            placeholder="What do you want to shrink?"
                            onChange={onUpdate}
                            value={text}/>
                    </div>
                    <div className="col">
                        <div className="TextEntry-shrunk-text">
                            {shrunkText}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {text && `${text.length} characters`}
                    </div>
                    <div className="col">
                        {shrunkText && `${shrunkText.length} characters`}
                    </div>
                </div>
            </div>
        );
    }
}

TextEntry.propTypes = {
    text: PropTypes.string,
    shrunkText: PropTypes.string,
    onUpdate: PropTypes.func
}

export default TextEntry;
