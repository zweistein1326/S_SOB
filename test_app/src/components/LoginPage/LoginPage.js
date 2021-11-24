import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { startLoginSSOB } from '../../actions/ssoLogin';
import styles from './LoginPage.module.css'

export const LoginPage = (props) => {
    return (
        <div className={styles.boxLayout}>
            <button className={styles.box} onClick={props.startLogin}>Login with Google</button>
            <button className={styles.box} onClick={props.startLoginSSOB}>Login with SSOB</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    startLoginSSOB: () => dispatch(startLoginSSOB())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);