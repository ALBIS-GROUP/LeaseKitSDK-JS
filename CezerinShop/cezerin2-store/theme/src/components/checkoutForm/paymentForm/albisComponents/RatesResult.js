import React, { Component } from 'react';
import { AvForm, AvInput, AvGroup } from 'availity-reactstrap-validation';
import { Col, Button, Label, FormGroup, Input } from 'reactstrap';

class RatesResult extends Component {
	render() {
		return (
			<div className="pb-5">
				<h3 className="albis-rates-proposed-header">RATES PROPOSED:</h3>
				<hr />
				<AvForm className="form-part payment-methods">
					<FormGroup tag="fieldset" className="albis-fieldset">
						{this.props.rates.map((rate, idx) => {
							return (
								<FormGroup
									check
									key={'rate' + idx}
                  className={!(idx % 2) ? 'albis-form-table-light' : 'albis-form-table-dark'}
                  onChange={() => this.props.chooseRate(rate)}
								>
									<Label check className="d-block">
										<Input
											type="radio"
											name="ratesOptions"
											className="albis-form-radio-input"
										/>{' '}
										<div className="albis-rate-data-all">
											<div className="col-sm py-2 text-left ml-2">
												<div>
													<div className="albis-rate-data-description">
														Lease term:{' '}
													</div>
													<div className="albis-rate-data">
														{rate.leaseTerm + ' months'}
													</div>
												</div>
											</div>
											<div className="col-sm py-2 text-left">
												<div>
													<div className="albis-rate-data-description">
														Cost per month:{' '}
													</div>
													<div className="albis-rate-data">
														{rate.rate + ' €'}
													</div>
												</div>
											</div>
											<div className="col-sm py-2 text-left">
												<div>
													<div className="albis-rate-data-description">
														Cost per month (insurance included):{' '}
													</div>
													<div className="albis-rate-data">
														{rate.rateWithInsurance + ' €'}{' '}
													</div>
												</div>
											</div>
											<div className="col-sm py-2 text-left">
												<div>
													<div className="albis-rate-data-description">
														Final payment:{' '}
													</div>
													<div className="albis-rate-data">
														{rate.finalPayment && rate.finalPayment + ' €'}
													</div>
												</div>
											</div>
											<div className="col-sm py-2 text-left">
												<div>
													<div className="albis-rate-data-description">
														Total:{' '}
													</div>
													<div className="albis-rate-data">
														{rate.total + ' €'}
													</div>
												</div>
											</div>
										</div>
									</Label>
								</FormGroup>
							);
						})}
					</FormGroup>
				</AvForm>
			</div>
		);
	}
}

export default RatesResult;
