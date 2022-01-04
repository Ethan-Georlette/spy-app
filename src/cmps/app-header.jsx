import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
// const { NavLink } = ReactRouterDOM


import { onLogin, onLogout, onSignup } from '../store/user.actions.js'
import { UserMsg } from './user-msg.jsx'
import { LoginSignup } from './login-signup.jsx'

class _AppHeader extends React.Component {
    onLogin = (credentials) => {
        this.props.onLogin(credentials)
    }
    onSignup = (credentials) => {
        this.props.onSignup(credentials)
    }
    onLogout = () => {
        this.props.onLogout()
    }

    render() {
        const { count, user } = this.props
        return (
            <header>
                <p>count: {count}</p>
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/car">Cars</NavLink> |
                    <NavLink to="/about">About</NavLink>
                </nav>
                <h1>My App</h1>
                {user && <section className="user-info">
                    <p>{user.fullname} <span>{user.score}</span></p>
                    <button onClick={this.onLogout}>Logout</button>
                </section>}
                {!user && <section className="user-info">
                    <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} />
                </section>}


                <UserMsg />
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        count: state.userModule.count
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)