import React from 'react'

import eventBus from '../util/eventbus'

import '../styles/text_form.css'

class TextForm extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(event) {
      eventBus.dispatch("text_submit", {text: this.state.value});
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit} className='form'>
            <textarea id="w3review" name="w3review" rows="4" cols="50" value={this.state.value} onChange={this.handleChange}>
            </textarea>
            <input type="submit" value="Submit" className = 'button'/>
          </form>
        </div>
      );
    }
}

export default TextForm