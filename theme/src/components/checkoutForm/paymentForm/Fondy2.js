import React, {Fragment} from 'react';
//import './fondy.css';

let scriptAdded = false;
const formStyle = {
    height: '100%',
    margin: '0',
    overflowY: 'scroll',
    overflowX: 'scroll'
    };

export default class Fondy extends React.Component {
    constructor(props) {
        super(props);
    }

    

    addScript = () => {
        if(scriptAdded) {
            console.log("script added");
            
            this.executeScript();
            return;
        }
        console.log("script adding");
        const SCRIPT_URL = 'https://api.fondy.eu/static_common/v1/checkout/ipsp.js'
        const STYLE_URL = 'https://pay.fondy.eu/latest/checkout.css'
        const container = document.body || document.head;
        const script = document.createElement('script');
        const link = document.createElement('link');
        script.src = SCRIPT_URL;
        link.href = STYLE_URL;
        link.rel = 'stylesheet';
        script.onload = () => {
            console.log("script execution");

            this.executeScript();
        };
        link.onload = () => console.log("link added");
        container.appendChild(script);
        container.appendChild(link)
        scriptAdded = true;
    }

    executeScript = () => {
        const { formSettings, shopSettings, onPayment, fondyOptions } = this.props;
        
            console.log("++++++++++")
            var button = $ipsp.get('button');
            button.setMerchantId( 1396424);
            button.setAmount('', 'USD');
            button.setHost('api.fondy.eu');
            console.log(button)
       
    }

    componentDidMount() {
        console.log('fondy did mount')
		this.addScript();
    }

    componentDidUpdate() {
		console.log('fondy did update')
		this.executeScript();
    }
    
    render() {
        return (
            <div>
                <button onClick={() => {
                    document.location.href=document.button.getUrl()
                    console.log(document.button.getUrl())
                }}>
                    Pay an arbitrary amount
                </button>
            </div>
		);

    }
}