import React, { Component } from 'react';
import { Col, Button, Label } from 'reactstrap';
import _ from 'lodash';
import RatesForm from './RatesForm';
import RatesResult from './RatesResult';
import Albis from '@albis-group/albis-leasing-sdk';
import BarLoader from 'react-spinners/BarLoader';

class AlbisPaymentForm extends Component {
	state = {
		object: this.props.cart.items
			.map(item => {
				if (item.quantity > 1) {
					return item.name + ' x' + item.quantity;
				}
				return item.name;
			})
			.join(', '),
		purchasePrice: this.props.cart.items
			.map(item => item.price_total)
			.reduce((a, b) => a + b, 0),
		productGroup: 1,
		contactByEmail: false,
		downPayment: null,
		contractType: 1,
		paymentMethod: 2,
		rates: null,
		rate: null,
		leaseTerm: null,
		rateWithInsurance: null,
		finalPayment: null,
		lessee: {
			name: this.props.cart.first_name + ' ' + this.props.cart.last_name,
			legalForm: this.props.cart.legal_form,
			street: this.props.cart.shipping_address.street,
			zipCode: this.props.cart.shipping_address.postal_code,
			city: this.props.cart.shipping_address.city,
			phoneNumber: this.props.cart.mobile,
			faxNumber: this.props.cart.fax,
			email: this.props.cart.email,
			manager: {
				salutation: 1,
				firstName: 'Lady X',
				lastName: 'Blackwater',
				street: 'Piłsudskiego',
				zipCode: '50000',
				city: 'Warszawa',
				birthDate: '01.01.1990'
			},
		},
		retailer: {
			name: 'Cezerin',
			street: 'IT-street',
			zipCode: '50500',
			city: 'Hamburg',
			email: 'cezerin@gmail.com',
			phoneNumber: '123456789'
		},
		receiverEndpoint: this.props.receiverEndpoint,
    receiverFailEmails: this.props.receiverFailEmails ? this.props.receiverFailEmails.split(',') : [],
		serviceFee: 30,
		iban: null,
		applicationId: null,
		isLoadingRates: false,
		isLoadingApplication: false,
		error: null,
		token: this.props.albisToken
	};

	albis = new Albis({
		SDKendpoint: this.props.SDKendpoint,
		apiStage: this.props.apiStage,
		provision: 3
	});

	getRates = async values => {
		this.setState({
			isLoadingRates: true
		});
		let a = null;
		let error = null;
		try {
			a = await this.albis.getRates(values, this.state.token);
		} catch (err) {
			console.log(err);
			error = 'Something went wrong';
		}
		if (error) {
			// error caused by Lambda
			this.setState({
				error: { errorRates: { message: error } },
				isLoadingRates: false,
				rates: null
			});
		} else {
			// everything works fine, rates fetched
			this.setState({
				rates: a.result,
				isLoadingRates: false,
				error: { errorRates: null }
			});
		}
	};

	chooseRate = rate => {
		this.setState({
			rate: rate.rate,
			leaseTerm: rate.leaseTerm,
			rateWithInsurance: rate.rateWithInsurance,
			finalPayment: rate.finalPayment
		});
	};

	setRatesFormValues = state => {
		this.setState(state);
	};

	saveApplication = async state => {
		this.setState({ isLoadingApplication: true });
		let a = null;
		let error = null;
		try {
			a = await this.albis.saveApplication(
				_.pick(state, [
					'object',
					'purchasePrice',
					'leaseTerm',
					'rate',
					'lessee',
					'productGroup',
					'iban',
					'downPayment',
					'contractType',
					'paymentMethod',
					'serviceFee',
					'retailer',
					'receiverEndpoint',
					'receiverFailEmails'
				]),
				this.state.token
			);
			console.log(a)
		} catch (err) {
			console.log(err);
			error = 'Something went wrong';
		}
		if (error) {
			// error caused by Lambda
			this.setState({
				error: { errorApplication: { message: error } },
				isLoadingApplication: false,
				applicationId: null
			});
		} else {
			// everything works fine, application fetched
			this.props.setApplicationId(a.result);
			this.setState({
				applicationId: a.result,
				isLoadingApplication: false,
				error: { errorApplication: null }
			});
			this.props.onPayment();
		}
	};

	render() {
		const {
			isLoadingRates,
			isLoadingApplication,
			rates,
			applicationId,
			object,
			purchasePrice,
			error
		} = this.state;

		return (
			<div className="albis-payment-form">
				<RatesForm
					getRates={this.getRates}
					setRatesFormValues={this.setRatesFormValues}
					object={object}
					purchasePrice={purchasePrice}
					isLoadingRates={isLoadingRates}
				/>
				{error && error.errorRates && (
					<div className={'albis-error'}>
						<h1>Error occured: {error.errorRates.message}</h1>
					</div>
				)}
				{isLoadingRates && (
					<div className="albis-barloader-div">
						<BarLoader
							css="margin: auto;"
							sizeUnit={'px'}
							width={300}
							height={10}
							color={'rgb(200, 200, 200);'}
							loading={isLoadingRates}
						/>
					</div>
				)}
				{rates && (
					<RatesResult
						rates={rates}
						chooseRate={this.chooseRate}
						isLoadingRates={isLoadingRates}
					/>
				)}
				{this.state.rate && (
					<div className="checkout-button-wrap">
						<Button
							className="checkout-button button"
							onClick={() => this.saveApplication(this.state)}
							disabled={isLoadingApplication}
						>
							Create application
						</Button>
					</div>
				)}
				{error && error.errorApplication && (
					<div className={'albis-error'}>
						<h1>Error occured: {error.errorApplication.message}</h1>
					</div>
				)}
				{isLoadingApplication && (
					<div className="albis-barloader-div">
						<BarLoader
							css="margin: auto;"
							sizeUnit={'px'}
							width={300}
							height={10}
							color={'rgb(200, 200, 200);'}
							loading={isLoadingApplication}
						/>
					</div>
				)}
				{applicationId && applicationId.result && !applicationId.result.message && (
					<div className={'albis-application-result'}>
						<h1>Application id is: {applicationId.result}</h1>
					</div>
				)}
			</div>
		);
	}
}

export default AlbisPaymentForm;
