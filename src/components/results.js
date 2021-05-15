import React from "react";
import axios from "axios";

import eventBus from "../util/eventbus";



class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      loading: false,
      messages: [],
      errors: []
    };
  }

  componentDidMount() {
    eventBus.on("text_submit", (data) => {
      this.getResults(data.text)
    });
  }

  componentWillUnmount() {
    eventBus.remove("text_submit");
  }

  getResults(text) {
    this.setState({loading: true})
    axios
      // .get(`http://localhost:5000/rhymes/${text}`)
      .get(`https://mysterious-sierra-59283.herokuapp.com/rhymes/${text}`)
      .then((res) => {
        console.log(res.data)
        this.setState({results: res.data.rhyme})
      })
      .catch((error) => {
        this.addError(error.response.data.error)
      })
      .then(() => {
        this.setState({loading: false})
        this.clearMessages()
      });
  }

  addMessage(message){
    this.setState({messages: this.state.messages.concat([message])})
  }

  addError(error){
    this.setState({errors: this.state.errors.concat([error])})
  }

  clearMessages() {
    setInterval(
      () => this.setState({messages: [], errors: []})
      , 5000);
  }


  render() {
    return (
      <div className='reps'>
        {this.state.messages ? this.state.messages.map( message => 
          <p key={message} style={{color:"green"}}>{message}</p>
        ): null}
        {this.state.errors ? this.state.errors.map( error => 
          <p key={error} style={{color:"red"}}>{error}</p>
        ): null}
        {this.state.loading ? <p>Loading ...</p>: null}
        {this.state.results ? <pre>{JSON.stringify(this.state.results, null, 2)}</pre>: null}
      </div>
    );
  }
}

export default Results;
