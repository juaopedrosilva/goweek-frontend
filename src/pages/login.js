import React, { Component } from 'react'
import twitterLogo from '../twitter.svg';
import './Login.css'


export default class Login extends Component {
    state = {
        userName: ''
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { userName } = this.state

        if(!userName) return

        localStorage.setItem('@goTwitter::username', userName)

        this.props.history.push('/timiline')
    }
    handleInputChange = (e) => {
        this.setState({ userName: e.target.value })
    }
    render() {
        return (
            <div className='login-wrapper'>
                <img src={twitterLogo} alt='GoTwitter' /> 
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder='Nome de usuário'
                        value={this.state.userName}
                        onChange={this.handleInputChange}
                    />
                    <button type='submit'>Entrar</button>
                </form>
            </div>
        )
    }
}
