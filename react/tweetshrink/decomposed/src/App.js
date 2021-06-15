import React, {Component} from 'react';
import 'shoelace-css/dist/shoelace.css';
import './App.css';
import Option from './components/Option';
import TextEntry from './components/TextEntry';
import shrinkText, {textOptions} from './shrinkText';

class App extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            options: []
        }
    }

    updateText(event) {
        this.setState({
            text: event.target.value
        });
    }

    setOption(option) {
        return (event) => {
            const value = event.target.checked;
            console.log(value);
            const optionSet = new Set(this.state.options);
            if (value) {
                optionSet.add(option);
            } else {
                optionSet.delete(option);
            }
            this.setState({
                options: [...optionSet]
            })
        }
    }

    shrinkText() {
        let { text, options } = this.state;
        return shrinkText(text, options);
    }

    render() {
        return (
            <div className="App container">
                <h1>TweetShrink</h1>
                <TextEntry text={this.state.text}
                           shrunkText={this.shrinkText()}
                           onUpdate={this.updateText.bind(this)} />
                <div className="row options">
                    <div className="col-12">
                        <h4>Options</h4>
                    </div>
                    {textOptions.map(option => (
                        <div key={option.id}
                            className="col-6">
                            <Option id={option.id}
                            label={option.label}
                            action={this.setOption(option.id)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
