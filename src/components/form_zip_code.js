import React from 'react'

import eventBus from '../util/eventbus'

import "../styles/form_zip_code.css"

class FormZipCode extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {value: '', messages: '', errors: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleSubmit(event) {
      eventBus.dispatch("zip_code_submit", { message: "zip code sent!", zip_code: this.state.value});
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    validZipCode(zip_code) {
      var zip_regex = /^\d{5}$|^\d{5}-\d{4}$/
      return zip_regex.test(zip_code)
    }

    resetForm(){
      this.setState( prevState => ({ ...prevState, value: ''}));
    }

    addMessage(message){
      this.setState( prevState => ({ ...prevState, messages: this.state.messages.concat([message])}))
    }
    addError(error){
      this.setState( prevState => ({ ...prevState, errors: this.state.errors.concat([error])}))
    }

    clearMessages(){
        setInterval(() => {
          this.setState( prevState => ({ ...prevState, messages: [], errors: []}));
      }, 5000);
    }
  
    render() {
      return (
        <div>
          {this.state.messages.length ? this.state.messages.map(
                (message, i) => (
                  <li key={i}>{message}</li>
                )
              )
          : null}
          {this.state.errors.length ? this.state.errors.map(
              (error, i) => (
                  <li key={i}>{error}</li>
              )
            )
          : null}
          <form onSubmit={this.handleSubmit} className='form'>
            <label className='subform'>
              <p>Zip Code:</p>
              <input type="text" value={this.state.value} onChange={this.handleChange} className="text-input"/>
            </label>
            <input type="submit" value="Submit" className = 'button'/>
          </form>
        </div>
        
      );
    }
}

export default FormZipCode