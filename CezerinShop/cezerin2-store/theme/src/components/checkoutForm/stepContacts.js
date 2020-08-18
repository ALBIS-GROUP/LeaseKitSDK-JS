import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';
import Albis from '@albis-group/albis-leasing-sdk';
import BarLoader from 'react-spinners/BarLoader';

const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

const validateEmail = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? text.emailInvalid
		: undefined;

const validatePostalCode = value =>
	value && !/\b\d{5}\b/g.test(value) ? text.postalCodeInvalid : undefined;

const ReadOnlyField = ({ name, value }) => (
	<div className="checkout-field-preview">
		<div className="name">{name}</div>
		<div className="value">{value}</div>
	</div>
);

class CheckoutStepContacts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedin: false,
			reinitialized: false,
			emailValues: '',
			comparePassword: '',
			legalFormsList: [],
			isLoadingLegalForms: true,
			error: { errorLegalForms: null },
			token: this.props.albisToken,
			SDKendpoint: this.props.SDKendpoint,
			apiStage: this.props.apiStage
		};

		this.setInitialValues = this.setInitialValues.bind(this);
	}

	albis = new Albis({
		SDKendpoint: this.props.SDKendpoint,
		apiStage: this.props.apiStage
	});

	getLegalFormsList = async () => {
		this.setState({
			isLoadingLegalForms: true
		});
		let a = null;
		let error = null;
		try {
			a = await this.albis.getLegalForms(this.state.token);
		} catch (err) {
			console.log(err);
			error = 'Something went wrong';
		}
		if (error) {
			// error caused by Lambda
			this.setState({
				error: { errorLegalForms: { message: error } },
				isLoadingLegalForms: false,
				legalFormsList: []
			});
		} else if (a.message) {
			// error caused by Albis API
			this.setState({
				error: { errorLegalForms: a },
				isLoadingLegalForms: false,
				legalFormsList: []
			});
		} else {
			// everything works fine, legal forms fetched
			this.setState({
				legalFormsList: a.result,
				isLoadingLegalForms: false,
				error: { errorLegalForms: null }
			});
		}
	};

	componentDidMount() {
		if (Lscache.get('auth_data') !== null) {
			this.setState({ loggedin: true });
		}
		const albisToken = this.props.albisToken
		this.getLegalFormsList(albisToken);
	}

	setInitialValues() {
		Lscache.flushExpired();
		if (Lscache.get('auth_data') !== null) {
			this.props.initialize({
				first_name: this.props.customerProperties.customer_settings.first_name,
				last_name: this.props.customerProperties.customer_settings.last_name,
				legal_form: this.props.customerProperties.customer_settings.legal_form,
				email: this.props.customerProperties.customer_settings.email,
				billing_address: {
					street:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[0]
									.street
							: '',
					city:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[0]
									.city
							: '',
					postal_code:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[0]
									.postal_code
							: '',
					state:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[0]
									.state
							: '',
					country:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[0]
									.country
							: ''
				},
				shipping_address: {
					street:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[1]
									.street
							: '',
					city:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[1]
									.city
							: '',
					postal_code:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[1]
									.postal_code
							: '',
					state:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[1]
									.state
							: '',
					country:
						this.props.customerProperties.customer_settings.addresses.length > 0
							? this.props.customerProperties.customer_settings.addresses[1]
									.country
							: ''
				}
			});
		}

		this.setState({ reinitialized: true });
		this.setState({
			emailValues: this.props.customerProperties.customer_settings.email
		});
		// this.props.change("input", {disabled: true});
	}

	passwordTemp = value => {
		this.setState({ comparePassword: value.currentTarget.defaultValue });
	};

	getField = fieldName => {
		const fields = this.props.checkoutFields || [];
		const field = fields.find(item => item.name === fieldName);
		return field;
	};

	getFieldStatus = fieldName => {
		const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	isFieldOptional = fieldName => this.getFieldStatus(fieldName) === 'optional';

	isFieldHidden = fieldName => this.getFieldStatus(fieldName) === 'hidden';

	getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		const validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}
		if (fieldName === 'postal_code') {
			validatorsArray.push(validatePostalCode);
		}
		if (fieldName === 'password_verify') {
			validatorsArray.push(this.confirmPassword);
		}

		return validatorsArray;
	};

	confirmPassword = value => {
		if (value !== this.state.comparePassword) {
			return text.password_verify_failed;
		}
		return undefined;
	};

	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	getFieldLabelText = fieldName => {
		const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		}
		switch (fieldName) {
			case 'first_name':
				return text.first_name;
				break;
			case 'last_name':
				return text.last_name;
				break;
			case 'legal_form':
				return text.legal_form;
				break;
			case 'email':
				return text.email;
				break;
			case 'mobile':
				return text.mobile;
				break;
			case 'fax':
				return text.fax;
				break;
			case 'password':
				return text.password;
				break;
			case 'password_verify':
				return text.password_verify;
				break;
			case 'street':
				return text.street;
				break;
			case 'country':
				return text.country;
				break;
			case 'state':
				return text.state;
				break;
			case 'city':
				return text.city;
				break;
			case 'postal_code':
				return text.postal_code;
				break;
			default:
				return 'Unnamed field';
		}
	};

	getFieldLabel = fieldName => {
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName)
			? `${labelText} (${text.optional})`
			: labelText;
	};

	render() {
		const {
			cart,
			handleSubmit,
			customerProperties,
			pristine,
			invalid,
			valid,
			reset,
			submitting,
			loadingShippingMethods,
			loadingPaymentMethods,
			initialValues,
			settings,
			saveShippingLocation,
			saveShippingMethod,
			savePaymentMethod,
			paymentMethods,
			shippingMethods,
			inputClassName,
			buttonClassName,
			editButtonClassName,
			onEdit,
			isReadOnly,
			title
		} = this.props;

		const { error, isLoadingLegalForms } = this.state;

		if (
			customerProperties !== undefined &&
			!this.state.reinitialized &&
			this.state.loggedin
		) {
			this.setInitialValues();
		}

		if (isReadOnly) {
			return (
				<div className="checkout-step">
					<h1>
						<span>1</span>
						{title}
					</h1>
					{!this.isFieldHidden('first_name') && (
						<ReadOnlyField
							name={text.first_name}
							value={initialValues.first_name}
						/>
					)}
					{!this.isFieldHidden('last_name') && (
						<ReadOnlyField
							name={text.last_name}
							value={initialValues.last_name}
						/>
					)}
					{!this.isFieldHidden('legal_form') && (
						<ReadOnlyField
							name={text.legal_form}
							value={initialValues.legal_form}
						/>
					)}
					{!this.isFieldHidden('email') && (
						<ReadOnlyField name={text.email} value={initialValues.email} />
					)}
					{!this.isFieldHidden('mobile') && (
						<ReadOnlyField name={text.mobile} value={initialValues.mobile} />
					)}
					{!this.isFieldHidden('fax') && (
						<ReadOnlyField name={text.fax} value={initialValues.fax} />
					)}
					{!this.isFieldHidden('street') && (
						<ReadOnlyField
							name={text.street}
							value={initialValues.shipping_address.street}
						/>
					)}
					{!this.isFieldHidden('country') && (
						<ReadOnlyField
							name={text.country}
							value={initialValues.shipping_address.country}
						/>
					)}
					{!this.isFieldHidden('state') && (
						<ReadOnlyField
							name={text.state}
							value={initialValues.shipping_address.state}
						/>
					)}
					{!this.isFieldHidden('postal_code') && (
						<ReadOnlyField
							name={text.postal_code}
							value={initialValues.shipping_address.postal_code}
						/>
					)}
					{!this.isFieldHidden('city') && (
						<ReadOnlyField
							name={text.city}
							value={initialValues.shipping_address.city}
						/>
					)}
					<ReadOnlyField
						name={text.shippingMethod}
						value={initialValues.shipping_method}
					/>
					<ReadOnlyField
						name={text.paymentMethod}
						value={initialValues.payment_method}
					/>

					<div className="checkout-button-wrap">
						<button
							type="button"
							onClick={onEdit}
							className={editButtonClassName}
						>
							{text.edit}
						</button>
					</div>

					<h2>
						{text.shippingMethods}{' '}
						{loadingShippingMethods && <small>{text.loading}</small>}
					</h2>
					<div className="shipping-methods">
						{shippingMethods.map((method, index) => (
							<label
								key={index}
								className={`shipping-method${
									method.id === initialValues.shipping_method_id
										? ' active'
										: ''
								}`}
							>
								<Field
									name="shipping_method_id"
									component="input"
									type="radio"
									value={method.id}
									onClick={() => {
										saveShippingMethod(method.id);
									}}
								/>
								<div>
									<div className="shipping-method-name">{method.name}</div>
									<div className="shipping-method-description">
										{method.description}
									</div>
								</div>
								<span className="shipping-method-rate">
									{formatCurrency(method.price, settings)}
								</span>
							</label>
						))}
					</div>

					<h2>
						{text.paymentMethods}{' '}
						{loadingPaymentMethods && <small>{text.loading}</small>}
					</h2>
					<div className="payment-methods">
						{paymentMethods.map((method, index) => {
							return (
								<label
									key={index}
									className={`payment-method${
										method.id === initialValues.payment_method_id
											? ' active'
											: ''
									}`}
								>
									<Field
										name="payment_method_id"
										validate={[validateRequired]}
										component="input"
										type="radio"
										value={method.id}
										onClick={() => {
											savePaymentMethod(method.id);
										}}
									/>
									<div>
										<div className="payment-method-name">{method.name}</div>
										<div className="payment-method-description">
											{method.description}
										</div>
									</div>
									<span className="payment-method-logo" />
								</label>
							);
						})}
					</div>
				</div>
			);
		}
		return (
			<div className="checkout-step">
				<h1>
					<span>1</span>
					{title}
				</h1>
				<form onSubmit={handleSubmit}>
					{!this.isFieldHidden('first_name') && (
						<Field
							className={inputClassName}
							name="first_name"
							id="customer.first_name"
							autoComplete="new-password"
							component={InputField}
							type="text"
							label={this.getFieldLabel('first_name')}
							validate={this.getFieldValidators('first_name')}
							placeholder={this.getFieldPlaceholder('first_name')}
						/>
					)}

					{!this.isFieldHidden('last_name') && (
						<Field
							className={inputClassName}
							name="last_name"
							id="customer.last_name"
							autoComplete="new-password"
							component={InputField}
							type="text"
							label={this.getFieldLabel('last_name')}
							validate={this.getFieldValidators('last_name')}
							placeholder={this.getFieldPlaceholder('last_name')}
						/>
					)}
					{isLoadingLegalForms && (
						<div className="albis-barloader-div">
							<BarLoader
								css="margin: auto;"
								sizeUnit={'px'}
								width={300}
								height={10}
								color={'rgb(200, 200, 200);'}
								loading={isLoadingLegalForms}
							/>
						</div>
					)}
					{error && error.errorLegalForms && (
						<div className={'albis-error'}>
							<h1>Error occured: {error.errorLegalForms.message}</h1>
						</div>
					)}
					{!this.isFieldHidden('legal_form') &&
						!error.errorLegalForms &&
						!isLoadingLegalForms && (
							<div className="checkout-field">
								<label htmlFor="customer.legal_form">
									{this.getFieldLabel('legal_form')}
								</label>
								<Field
									component="select"
									name="legal_form"
									id="customer.legal_form"
									autoComplete="new-password"
									type="select"
									label={this.getFieldLabel('legal_form')}
									options={this.state.legalFormsList}
									placeholder={this.getFieldPlaceholder('legal_form')}
									validate={this.getFieldValidators('legal_form')}
								>
									<option />
									{this.state.legalFormsList.map(legalForm => (
										<option value={legalForm.text} key={legalForm.text}>
											{legalForm.text}
										</option>
									))}
								</Field>
							</div>
						)}

					{this.state.loggedin ? (
						<ReadOnlyField
							name={text.email}
							value={this.state.emailValues}
							className="logged-in-email-field"
							label={this.getFieldLabel('email')}
						/>
					) : (
						!this.isFieldHidden('email') && (
							<Field
								className={inputClassName}
								name="email"
								id="customer.email"
								autoComplete="new-password"
								component={InputField} // this.state.loggedin
								type="email"
								label={this.getFieldLabel('email')}
								validate={this.getFieldValidators('email')}
								placeholder={this.getFieldPlaceholder('email')}
							/>
						)
					)}

					{!this.isFieldHidden('mobile') && (
						<Field
							className={inputClassName}
							name="mobile"
							id="customer.mobile"
							autocomplete="new-password"
							component={InputField}
							type="tel"
							label={this.getFieldLabel('mobile')}
							validate={this.getFieldValidators('mobile')}
							placeholder={this.getFieldPlaceholder('mobile')}
						/>
					)}

					{!this.isFieldHidden('fax') && (
						<Field
							className={inputClassName}
							name="fax"
							id="customer.fax"
							autocomplete="new-password"
							component={InputField}
							type="tel"
							label={this.getFieldLabel('fax')}
							validate={this.getFieldValidators('fax')}
							placeholder={this.getFieldPlaceholder('fax')}
						/>
					)}

					{this.state.loggedin
						? this.isFieldHidden('password')
						: !this.isFieldHidden('password') && (
								<Field
									className={inputClassName}
									name="password"
									id="customer.password"
									autoComplete="new-password"
									component={InputField}
									type="password"
									onBlur={this.passwordTemp}
									label={
										!this.state.loggedin ? this.getFieldLabel('password') : ''
									}
									validate={this.getFieldValidators('password')}
									placeholder={this.getFieldPlaceholder('password')}
								/>
						  )}

					{this.state.loggedin
						? this.isFieldHidden('password')
						: !this.isFieldHidden('password') && (
								<Field
									className={inputClassName}
									name="password_verify"
									id="customer.password_verify"
									autoComplete="new-password"
									component={InputField}
									type="password"
									label={
										!this.state.loggedin
											? this.getFieldLabel('password_verify')
											: ''
									}
									validate={this.getFieldValidators('password_verify')}
									placeholder={this.getFieldPlaceholder('password_verify')}
								/>
						  )}

					{!this.isFieldHidden('street') && (
						<Field
							className={inputClassName}
							name="shipping_address.street"
							id="shipping_address.street"
							component={InputField}
							type="text"
							label={this.getFieldLabel('street')}
							validate={this.getFieldValidators('street')}
							placeholder={this.getFieldPlaceholder('street')}
							onBlur={(event, value) =>
								setTimeout(() => saveShippingLocation({ street: value }))
							}
						/>
					)}

					{!this.isFieldHidden('country') && (
						<Field
							className={inputClassName}
							name="shipping_address.country"
							id="shipping_address.country"
							component={InputField}
							type="text"
							label={this.getFieldLabel('country')}
							validate={this.getFieldValidators('country')}
							placeholder={this.getFieldPlaceholder('country')}
							onBlur={(event, value) =>
								setTimeout(() => saveShippingLocation({ country: value }))
							}
						/>
					)}

					{!this.isFieldHidden('state') && (
						<Field
							className={inputClassName}
							name="shipping_address.state"
							id="shipping_address.state"
							component={InputField}
							type="text"
							label={this.getFieldLabel('state')}
							validate={this.getFieldValidators('state')}
							placeholder={this.getFieldPlaceholder('state')}
							onBlur={(event, value) =>
								setTimeout(() => saveShippingLocation({ state: value }))
							}
						/>
					)}
					{!this.isFieldHidden('postal_code') && (
						<Field
							className={inputClassName}
							name="shipping_address.postal_code"
							id="shipping_address.postal_code"
							component={InputField}
							type="text"
							label={this.getFieldLabel('postal_code')}
							validate={this.getFieldValidators('postal_code')}
							placeholder={this.getFieldPlaceholder('postal_code')}
							onBlur={(event, value) =>
								setTimeout(() => saveShippingLocation({ postal_code: value }))
							}
						/>
					)}
					{!this.isFieldHidden('city') && (
						<Field
							className={inputClassName}
							name="shipping_address.city"
							id="shipping_address.city"
							component={InputField}
							type="text"
							label={this.getFieldLabel('city')}
							validate={this.getFieldValidators('city')}
							placeholder={this.getFieldPlaceholder('city')}
							onBlur={(event, value) =>
								setTimeout(() => saveShippingLocation({ city: value }))
							}
						/>
					)}

					<div className="checkout-button-wrap">
						<button
							type="submit"
							disabled={invalid}
							className={buttonClassName}
						>
							{text.next}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'CheckoutStepContacts',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(CheckoutStepContacts);
