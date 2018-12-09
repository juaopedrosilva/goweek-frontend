import React, { Component } from 'react'

import like from '../like.svg'
import './Tweet.css'

import API from '../services/api'


export default class Tweeat extends Component {
    handleClick = async () => {
        const { _id } = this.props.tweet 

        await API.post(`likes/${_id}`)
    }
    render() {
        const { tweet } = this.props
        return (
        <li className='tweet'>
            <strong>{tweet.author}</strong>
            <p>{tweet.content}</p>
            <button type='button' onClick={this.handleClick}><img src={like} alt="Like" /> {tweet.likes}</button> 
        </li>
        )
    }
}
