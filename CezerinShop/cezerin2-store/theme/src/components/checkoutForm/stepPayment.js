import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import PaymentForm from './paymentForm';

const CheckoutStepPayment = props => {
	const {
		albisToken,
		cart,
		settings,
		processingCheckout,
		handleSuccessPayment,
		inputClassName,
		buttonClassName,
		shippingMethod,
		show,
		title,
		onCreateToken,
		setApplicationId
	} = props;

	const { payment_method_gateway, grand_total } = cart;

	if (!show) {
		return (
			<div className="checkout-step">
				<h1>
					<span>3</span>
					{title}
				</h1>
			</div>
		);
	}
	return (
		<div className="checkout-step">
			<h1>
				<span>3</span>
				{title}
			</h1>
			<div className="checkout-button-wrap">
				{!processingCheckout && (
					<PaymentForm
						albisToken={albisToken}
						cart={cart}
						gateway={payment_method_gateway}
						amount={grand_total}
						shopSettings={settings}
						shippingMethod={shippingMethod}
						onPayment={handleSuccessPayment}
						inputClassName={inputClassName}
						buttonClassName={buttonClassName}
						onCreateToken={onCreateToken}
						setApplicationId={setApplicationId}
					/>
				)}
				{processingCheckout && <p>{text.loading}</p>}
			</div>
		</div>
	);
};

export default CheckoutStepPayment;
