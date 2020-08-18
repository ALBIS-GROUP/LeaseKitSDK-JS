import React, { Component } from 'react';
import { AvForm, AvInput, AvGroup } from 'availity-reactstrap-validation';
import { Col, Button, Label } from 'reactstrap';
import _ from 'lodash';

class RatesForm extends Component {
	state = {
		object: this.props.object,
		purchasePrice: this.props.purchasePrice,
		productGroup: 1,
		downPayment: null,
		contractType: 1,
		paymentMethod: 'monthly',
		serviceFee: 30,
		iban: 'DE88100900001234567892'
	};

	setProductGroup = value => {
		this.setState({
			productGroup: value
		});
	};

	setDownPayment = value => {
		this.setState({
			downPayment: value
		});
	};

	setContractType = value => {
		this.setState({
			contractType: value
		});
	};

	setPaymentMethod = value => {
		this.setState({
			paymentMethod: value
		});
	};

	setServiceFee = value => {
		this.setState({
			serviceFee: value
		});
	};

	setIban = value => {
		this.setState({
			iban: value
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) this.props.setRatesFormValues(this.state);
	}

	render() {
		const {
			object,
			purchasePrice,
			productGroup,
			downPayment,
			contractType,
			paymentMethod,
			rates,
			lessee,
			serviceFee,
			iban,
			legalForms
		} = this.state;
		return (
			<div>
				<AvForm
					className="form-part"
					onValidSubmit={() => {
						this.props.getRates(
							_.pick(this.state, [
								'object',
								'purchasePrice',
								'productGroup',
								'downPayment',
								'contractType',
								'paymentMethod'
							])
						);
						this.props.setRatesFormValues(this.state);
					}}
					model={{ paymentMethod }}
				>
					<AvGroup className="checkout-field" row>
						<Label for="object" sm={4}>
							Object
						</Label>
						<Col sm={8}>
							<AvInput
								name="object"
								type="text"
								value={object}
								disabled
								required
								onChange={e => this.setObject(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<AvGroup className="checkout-field" row>
						<Label for="purchasePrice" sm={4}>
							Purchase price (net)
						</Label>
						<Col sm={8}>
							<AvInput
								name="purchasePrice"
								type="number"
								required
								disabled
								value={purchasePrice}
								onChange={e => this.setPurchasePrice(e.target.value)}
							/>
						</Col>
					</AvGroup>
					{/*<AvGroup className="checkout-field" row>
            <Label for="productGroup" sm={4}>
              Product group
            </Label>
            <Col sm={8}>
              <AvInput
                name="productGroup"
                type="number"
                required
                value={productGroup}
                onChange={(e) => this.setProductGroup(e.target.value)}
                disabled
              />
            </Col>
          </AvGroup>*/}
					<AvGroup className="checkout-field" row>
						<Label for="downPayment" sm={4}>
							Down payment
						</Label>
						<Col sm={8}>
							<AvInput
								name="downPayment"
								type="number"
								value={downPayment}
								onChange={e => this.setDownPayment(e.target.value)}
							/>
						</Col>
					</AvGroup>
					{/*<AvGroup className="checkout-field" row>
            <Label for="contractType" sm={4}>
              Contract type
            </Label>
            <Col sm={8}>
              <AvInput
                name="contractType"
                type="number"
                required
                value={contractType}
                onChange={(e) => this.setContractType(e.target.value)}
                disabled
              />
            </Col>
          </AvGroup>*/}
					<AvGroup className="checkout-field" row>
						<Label for="paymentMethod" sm={4}>
							Payment option
						</Label>
						<Col sm={8}>
							<AvInput
								name="paymentMethod"
								className="albis-select"
								required
								type="select"
								onChange={e => this.setPaymentMethod(e.target.value)}
							>
								<option value="monthly">monthly</option>
								<option value="quarterly">quarterly</option>
							</AvInput>
						</Col>
					</AvGroup>
					{/* <AvGroup className="checkout-field" row>
            <Label for="serviceFee" sm={4}>
              Service fee
            </Label>
            <Col sm={8}>
              <AvInput
                name="serviceFee"
                type="number"
                required
                value={serviceFee}
                onChange={(e) => this.setServiceFee(e.target.value)}
              />
            </Col>
          </AvGroup>*/}
					<AvGroup className="checkout-field" row>
						<Label for="iban" sm={4}>
							IBAN
						</Label>
						<Col sm={8}>
							<AvInput
								name="iban"
								type="text"
								value={iban}
								required
								onChange={e => this.setIban(e.target.value)}
							/>
						</Col>
					</AvGroup>
					<div className={'checkout-button-wrap'}>
						<Button
							className="checkout-button button"
							disabled={this.props.isLoadingRates}
						>
							Get rate
						</Button>
					</div>
				</AvForm>
			</div>
		);
	}
}

export default RatesForm;
