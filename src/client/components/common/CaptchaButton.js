import React, {Component} from 'react';
import ReCAPTCHA from 'react-google-recaptcha/lib/recaptcha-wrapper';
const config = require('../../../../config');
const SITE_KEY = config.google.recaptcha.site_key;

export default class RecaptchaButton extends Component {
    render() {
        return (
            <span>
                <ReCAPTCHA ref="recaptcha"
                           theme="dark"
                           sitekey={SITE_KEY}
                           onChange={this.props.captchaOnChange}/>
                <button type="button"
                        style={this.props.buttonStyle}
                        onClick={this.props.buttonOnClick}
                        disabled={this.props.buttonDisabled || false}>{this.props.buttonText}</button>
            </span>
        );
    }
}
