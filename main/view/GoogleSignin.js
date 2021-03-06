const React = require('react')
const {PropTypes} = require('react')
const GoogleLogin = require('react-google-login')['default']
const {ObservableEvent} = require('lsd-observable')

const GoogleSignin = React.createClass({
    render: function () {
        return (
            <GoogleLogin callback={this._onSignIn} clientId={this.props.clientId} cssClass="btn btn-default" buttonText="Sign in with Google"/>
        )
    },

    getDefaultProps: function() {
        return {accounts: []}
    },

    _onSignIn: function(auth) {
        const authResponse = auth.getAuthResponse();
        const event = new CustomEvent('googleSignIn', {detail: { authResponse }} );
        document.dispatchEvent(event)
    }
})

GoogleSignin.propTypes = {
    clientId: PropTypes.string.isRequired
}


GoogleSignin.Tracker = class GoogleSigninTracker {
    constructor() {
        this.signIn = new ObservableEvent()
        this.signOut = new ObservableEvent()
        document.addEventListener('googleSignIn', e =>  this.signIn.send(e.detail.authResponse) )
        document.addEventListener('googleSignOut', e => this.signOut.send(null))
    }
}

module.exports = GoogleSignin