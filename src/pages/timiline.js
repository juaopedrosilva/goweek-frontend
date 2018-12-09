import React, { Component } from 'react'
import API from '../services/api'
import Tweeat from '../components/Tweeat' 
import socket from 'socket.io-client'
import twitterLogo from '../twitter.svg';
import './Timeline.css';

export default class timiline extends Component {
    state = {
        tweets: [],
        newTweeat: ''
    }
    async componentDidMount(){
        this.subscribeToEvents()

        const response = await API.get('tweets')

        this.setState({ tweets: response.data })
    }
    hanleNewTweeat = async (e) => {
        if(e.keyCode !== 13) return

        const content = this.state.newTweeat
        const author = localStorage.getItem('@goTwitter::username')
         
        await API.post('tweets', { content, author })

        this.setState({ newTweeat: '' })

    }
    handleInputChange = (e) => {
        this.setState({ newTweeat: e.target.value })
    }
   
    subscribeToEvents = () => {
        const io = socket('http://localhost:3000') 
        io.on('tweeat', data => {
            this.setState({ tweets: [data, ...this.state.tweets]})
        })
        io.on('like', data => { 
            this.setState({ tweets: this.state.tweets.map(tweet => 
                tweet._id === data._id ? data : tweet
            )})
        })
    }
    render() {
        return (
        <div className='timeline-wrapper'>
            <img height={24} src={twitterLogo} alt="GoTwitter" />
            <form>
                <textarea 
                    value={this.state.newTweeat}
                    onChange={this.handleInputChange}
                    onKeyDown={this.hanleNewTweeat}
                    placeholder="O que está ancontecendo?"
                />
            </form>
            <ul className='tweet-list'>
                { this.state.tweets.map(tweet => <Tweeat key={tweet._id} tweet={tweet} />)}
            </ul>
        </div>
        )
    }
}
