import React from "react";

import eventBus from "../util/eventbus";

import "../styles/text_form.css";

class SongBit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, song_bit_edit: props.song_bit };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ song_bit_edit: event.target.value });
    eventBus.dispatch("edit_song_bit", {
      song_bit: this.state.song_bit_edit,
      i: this.props.i,
    });
  }

  render() {
    return (
      <div className="next">
        <input
          type="text"
          value={this.state.song_bit_edit}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}

export default SongBit;
