import React from "react";

import eventBus from "../util/eventbus";

import "../styles/text_form.css";

import SongBit from "./song_bit";

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: [], value: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddValue = this.handleAddValue.bind(this);
    this.handleAddExample = this.handleAddExample.bind(this);
    eventBus.on("edit_song_bit", (data) => {
      this.setState({
        values: this.state.values.map((each, i) =>
          i === data.i ? data.song_bit : each
        ),
      });
    });
  }

  handleAddValue(event) {
    if (this.state.value === "") {
      return;
    }
    this.setState({ values: this.state.values.concat([this.state.value]) });
    this.setState({ value: "" });
    console.log(this.state.values);
    event.preventDefault();
  }

  handleSubmit(event) {
    eventBus.dispatch("song_bits_submit", {
      song_bits: this.state.values,
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleAddExample(event) {
    console.log(this.state.values);
    this.setState({
      values: [],
    });
    this.setState({
      values: [
        "cruising down the street",
        "in my six four",
        "jocking them snitches",
        "hitting the floor",
        "went to the park to get the scoop",
        "knuckle heads ",
        "out there ",
        "cold shooting some hoops",
      ],
    });
  }

  render() {
    return (
      <div className="next">
        <div className="center margin16">
          <textarea
            type="text"
            className="textinput"
            rows="15"
            cols="60"
            value={this.state.value}
            onChange={this.handleChange}
          ></textarea>
          <button className="button" onClick={this.handleAddValue}>
            Add
          </button>
          <button className="button" onClick={this.handleSubmit}>
            Submit
          </button>
          <button className="button" onClick={this.handleAddExample}>
            Example
          </button>
        </div>
        <div>
          <p>
            {this.state.values.map((each, i) => (
              <div>
                {(i - 4) % 4 === 0 ? <br></br> : null}
                <SongBit song_bit={each} i={i} />
              </div>
            ))}
          </p>
        </div>
      </div>
    );
  }
}

export default TextForm;
