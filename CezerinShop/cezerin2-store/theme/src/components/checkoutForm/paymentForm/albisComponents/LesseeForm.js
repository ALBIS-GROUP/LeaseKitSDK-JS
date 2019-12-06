import React, { Component } from 'react';
import {
	AvForm,
	AvInput,
	AvGroup,
	AvField
} from 'availity-reactstrap-validation';
import { Col, Button, Label } from 'reactstrap';

class LesseeForm extends Component {
	state = this.props.lessee;

	setLesseeName = value => {
		this.setState({ name: value });
	};

	setLesseeLegalForm = value => {
		this.setState({ legalForm: value });
	};

	setLesseeStreet = value => {
		this.setState({ street: value });
	};

	setLesseeZipCode = value => {
		this.setState({ zipCode: value });
	};

	setLesseeCity = value => {
		this.setState({ city: value });
	};

	setLesseePhoneNumber = value => {
		this.setState({ phoneNumber: value });
	};

	setLesseeFaxNumber = value => {
		this.setState({ faxNumber: value });
	};

	setLesseeEmail = value => {
		this.setState({ email: value });
	};

	render() {
		const {
			name,
			legalForm,
			street,
			zipCode,
			city,
			phoneNumber,
			faxNumber,
			email
		} = this.state;

		return (
			<div className="pb-5">
				<h3>Lessee data</h3>
				<AvForm
					className="form-part"
					onValidSubmit={() => {
						this.props.saveApplication(this.state);
					}}
				>
					<AvGroup className="form-group" row>
						<Label for="name" sm={4}>
							Name
						</Label>
						<Col sm={8}>
							<AvInput
								name="name"
								type="text"
								required
								value={name}
								onChange={e => this.setLesseeName(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="legalForm" sm={4}>
							Legal form
						</Label>
						<Col sm={8}>
							<AvInput
								name="legalForm"
								type="select"
								required
								value={legalForm}
								onChange={e => this.setLesseeLegalForm(e.target.value)}
							>
								{this.props.legalForms.map(legalForm => (
									<option key={legalForm.text} value={legalForm.text}>
										{legalForm.text}
									</option>
								))}
							</AvInput>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="street" sm={4}>
							Street
						</Label>
						<Col sm={8}>
							<AvInput
								name="street"
								type="text"
								required
								value={street}
								onChange={e => this.setLesseeStreet(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="zipCode" sm={4}>
							Postal code
						</Label>
						<Col sm={8}>
							<AvInput
								name="zipCode"
								type="text"
								value={zipCode}
								required
								onChange={e => this.setLesseeZipCode(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="city" sm={4}>
							City
						</Label>
						<Col sm={8}>
							<AvInput
								name="city"
								type="text"
								required
								value={city}
								onChange={e => this.setLesseeCity(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="phoneNumber" sm={4}>
							Phone number
						</Label>
						<Col sm={8}>
							<AvInput
								name="phoneNumber"
								type="text"
								required
								value={phoneNumber}
								onChange={e => this.setLesseePhoneNumber(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="faxNumber" sm={4}>
							Fax number (optional)
						</Label>
						<Col sm={8}>
							<AvInput
								name="faxNumber"
								type="text"
								value={faxNumber}
								onChange={e => this.setLesseeFaxNumber(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="form-group" row>
						<Label for="email" sm={4}>
							Email
						</Label>
						<Col sm={8}>
							<AvInput
								name="email"
								type="text"
								required
								value={email}
								onChange={e => this.setLesseeEmail(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<div className={'checkout-button-wrap'}>
						<Button className="checkout-button button">
							Create application
						</Button>
					</div>
				</AvForm>
			</div>
		);
	}
}

export default LesseeForm;
