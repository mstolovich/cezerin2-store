import React from 'react';
//import './fondy.css';

let scriptAdded = false;
// const formStyle = {
//     height: '100%',
//     margin: '0',
//     overflowY: 'scroll',
//     overflowX: 'scroll'
//     };

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
        const SCRIPT_URL = 'https://pay.fondy.eu/latest/checkout.js'
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
        const { formSettings, shopSettings, onPayment } = this.props;

        console.log('fondyoptions',formSettings.fondyOptions)
			console.log('+++++++++++++++++++++++++++++++++++++++++++++++')
			console.log('fondyoptions',formSettings)

			console.log('+++++++++++++++++++++++++++++++++++++++++++++++')

        let app = fondy("#fondyForm", formSettings.fondyOptions)
        // .$on("success", function(model) {
        //     console.log("success event handled");

        //     let order_status = model.data.order.order_data.order_status;

        //     if (order_status == "approved") {
        //         console.log("Order is approved. Do something on approve...");
        //         onPayment();
        //     }
        // })
        // .$on("error", function(model) {
        //     console.log("error event handled");
        //     var order_status = model.data.order.order_data.order_status;
        //     var response_code = model.data.error.code;
        //     var response_description = model.data.error.message;
        //     if (order_status == "declined") {
        //     console.log(
        //         "Order is declined. Do somethng on decline... Last response code is: " +
        //         response_code +
        //         ", description: " +
        //         response_description
        //     );
        //     } else if (order_status == "processing") {
        //     console.log(
        //         "Order is in processing. Last response code is: " +
        //         response_code +
        //         ", description: " +
        //         response_description
        //     );
        //     }
        // });
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

				<div style={{
                    display: "inline-block"}} id="fondyForm" />
			</div>
		);

    }
}
