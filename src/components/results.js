import React from "react";
import axios from "axios";

import eventBus from "../util/eventbus";
import { TabList, Tab, TabPanel, Tabs } from "react-tabs";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      loading: false,
      messages: [],
      errors: [],
    };
  }

  componentDidMount() {
    eventBus.on("song_bits_submit", (data) => {
      this.getResults(data.song_bits);
    });
  }

  componentWillUnmount() {
    eventBus.remove("song_bits_submit");
  }

  getResults(song_bits) {
    this.setState({ loading: true });
    // .post(`https://quiet-earth-04570.herokuapp.com/rhymes`, {text: text})
    axios
      .post(`http://localhost:5000/rhymes`, { song_bits: song_bits })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({ results: res.data.rhyme });
      })
      .catch((error) => {
        this.addError(error.response.data.error);
      })
      .then(() => {
        this.setState({ loading: false });
        this.clearMessages();
      });
  }

  addMessage(message) {
    this.setState({ messages: this.state.messages.concat([message]) });
  }

  addError(error) {
    this.setState({ errors: this.state.errors.concat([error]) });
  }

  clearMessages() {
    setInterval(() => this.setState({ messages: [], errors: [] }), 5000);
  }

  render() {
    return (
      <div className="reps">
        {this.state.messages
          ? this.state.messages.map((message) => (
              <p key={message} style={{ color: "green" }}>
                {message}
              </p>
            ))
          : null}
        {this.state.errors
          ? this.state.errors.map((error) => (
              <p key={error} style={{ color: "red" }}>
                {error}
              </p>
            ))
          : null}
        {this.state.loading ? <p>Loading ...</p> : null}
        {this.state.results ? (
          <div>
            <Tabs>
              <TabList>
                <Tab>Stats</Tab>
                <Tab>Rhymes</Tab>
                <Tab>Frequency</Tab>
                <Tab>Bars</Tab>
              </TabList>
              <TabPanel>
                <pre>
                  {JSON.stringify(
                    { length: this.state.results.length },
                    null,
                    4
                  )}
                </pre>
              </TabPanel>
              <TabPanel>
                <pre>
                  {JSON.stringify({ rhyme: this.state.results.rhyme }, null, 4)}
                </pre>
              </TabPanel>
              <TabPanel>
                <pre>
                  {JSON.stringify(
                    { frequency: this.state.results.frequency },
                    null,
                    4
                  )}
                </pre>
              </TabPanel>
              <TabPanel>
                <pre>
                  {JSON.stringify({ bars: this.state.results.bars }, null, 4)}
                </pre>
              </TabPanel>
            </Tabs>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Results;
