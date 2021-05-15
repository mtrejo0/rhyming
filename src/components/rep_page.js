import React from "react";
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import '../styles/rep_page.css'

import { TwitterTimelineEmbed } from 'react-twitter-embed';



class RepPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rep: props.props,
      tweets: [],
      rep_socials: [],
      loading: true,
      messages: [],
      errors: []
    };
  }

  componentDidMount() {
    this.getRepInfo(this.state.rep.name)
  }


  getRepInfo(name) {
    axios
      .get(`https://frozen-brook-43368.herokuapp.com/rep_info/${name}`)
      // .get(`http://localhost:5000/rep_info/${name}`)
      .then((res) => {
        this.setState({rep_socials: res.data})
        console.log(res.data)
        this.setState({loading: false})
      })
      .catch((error) => {
        this.addError(error.response.data.error)
        this.setState({loading: true})
      })
      .then(() => {
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

  openHighlight() {
    window.open(this.state.rep_socials.user.twitter_link);
  }


  render() {
    return (
      <div className='rep-page'>
        <h1>{this.state.rep.name}</h1>
        {this.state.messages ? this.state.messages.map( message => 
          <p key={message} style={{color:"green"}}>{message}</p>
        ): null}
        {this.state.errors ? this.state.errors.map( error => 
          <p key={error} style={{color:"red"}}>{error}</p>
        ): null}
        {this.state.loading ? <p>Loading ...</p> : 
          <div>
            <p>{this.state.rep.party}</p>
            <p>{this.state.rep.district}, {this.state.rep.state}</p>
            <p><a href={`tel:${this.state.rep.phone}`}>{this.state.rep.phone}</a></p>
            
            <p><a href={`https://www.google.com/maps/search/?api=1&query=`+ this.state.rep.office} target='_blank' rel="noreferrer">Office</a>, <a href={this.state.rep.link} target='_blank' rel="noreferrer">Webpage</a></p>
            <p> <a href={this.state.rep_socials.user.twitter_link} target='_blank' rel="noreferrer">Twitter</a>,
                <a href={this.state.rep_socials.user.instagram_link} target='_blank' rel="noreferrer">Instagram</a>,
                <a href={this.state.rep_socials.user.facebook_link} target='_blank' rel="noreferrer">Facebook</a></p>
            

            

            <Tabs>
              <TabList>
                <Tab>Feed</Tab>
                <Tab>1-gram</Tab>
                <Tab>2-gram</Tab>
                <Tab>3-gram</Tab>
              </TabList>
              <TabPanel>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName={this.state.rep_socials.user.twitter_handle.substring(1)}
                  options={{height: 1000}}
                />
              </TabPanel>
              <TabPanel>
                <ul>
                  {this.state.rep_socials.words.one.map( (word, index) => 
                      <li><p><strong><a href={`http://www.google.com/search?q=${word[0]}`} target='_blank' rel="noreferrer">{word[0]}</a></strong>, {word[1]} times</p></li>
                  )}
                </ul>
              </TabPanel>
              <TabPanel>
                <ul>
                  {this.state.rep_socials.words.two.map( (word, index) => 
                      <li><p><strong><a href={`http://www.google.com/search?q=${word[0].join(' ')}`} target='_blank' rel="noreferrer">{word[0].join(' ')}</a></strong>, {word[1]} times</p></li>
                  )}
                </ul>
              </TabPanel>
              <TabPanel>
                <ul>
                  {this.state.rep_socials.words.three.map( (word, index) => 
                      <li><p><strong><a href={`http://www.google.com/search?q=${word[0].join(' ')}`} target='_blank' rel="noreferrer">{word[0].join(' ')}</a></strong>, {word[1]} times</p></li>
                  )}
                </ul>
              </TabPanel>

            </Tabs>


          </div>
        }
      </div>
    );
  }
}

export default RepPage;
