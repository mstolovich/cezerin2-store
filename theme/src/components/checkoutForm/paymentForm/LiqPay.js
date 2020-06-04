import React from 'react';

let scriptAdded = false;
export default class LiqPay extends React.Component {
	constructor(props) {
		super(props);
	}

	addScript = () => {
		if (scriptAdded) {
			this.executeScript();
			return;
		}

		const SCRIPT_URL = 'https://static.liqpay.ua/libjs/checkout.js';
		const container = document.body || document.head;
		const script = document.createElement('script');
		script.src = SCRIPT_URL;
		script.onload = () => {
			this.executeScript();
		};
		container.appendChild(script);
		scriptAdded = true;
	};

	executeScript = () => {
		const { formSettings, shopSettings, onPayment } = this.props;

		LiqPayCheckout.init({
			data: formSettings.data,
			signature: formSettings.signature,
			language: formSettings.language,
			embedTo: '#liqpay_checkout',
			mode: 'embed'
		})
			.on('liqpay.callback', data => {
				if (data.status === 'success') {
					
					onPayment();
				}
			})
			.on('liqpay.ready', data => {
				
				console.log('liqpay.ready')// ready
			})
			.on('liqpay.close', data => {
				// close
				console.log('liqpay close')
			});
	};

	componentDidMount() {
		console.log('liqpay did mount')
		this.addScript();
	}
	
	componentDidUpdate() {
		console.log('liqpay did update')
		this.executeScript();
	}

	render() {
		const { formSettings, shopSettings, onPayment } = this.props;

		return (
			<div>
				Liqpay hello!
				<div id="liqpay_checkout" />
			</div>
		);
	}
}
