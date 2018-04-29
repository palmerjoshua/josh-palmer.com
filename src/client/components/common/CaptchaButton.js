import React, {Component} from 'react';
import ReCAPTCHA from 'react-google-recaptcha/lib/recaptcha-wrapper';
const config = require('../../../../config');
const SITE_KEY = config.google.recaptcha.site_key;

class CaptchaButton extends Component {

    constructor(props) {
        super(props);
        this.resetCaptchaButton = this.resetCaptchaButton.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {recaptchaResponse: null};
    }

    onClick (e) {
        e.preventDefault();
        this.props.onClick(this.state.recaptchaResponse);
        this.resetCaptchaButton();
    }

    resetCaptchaButton () {
        this.setState({recaptchaResponse: null});
        window.grecaptcha.reset();
    }

    render() {
        return (
            <div className="captchaButton">
                <ReCAPTCHA ref="recaptcha"
                           theme="dark"
                           sitekey={SITE_KEY}
                           onChange={resp => this.setState({recaptchaResponse: resp})}/>
                <button type="button"
                        disabled={!this.state.recaptchaResponse}
                        onClick={this.onClick}>{this.props.buttonText}</button>
            </div>
        );
    }
}

export default CaptchaButton;
