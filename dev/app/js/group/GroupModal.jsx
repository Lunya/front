import React from 'react';
import { Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

export default class GroupModal extends React.Component {
	constructor(props) {
		super(props);
		let group = props.group || {
			name: '',
			scenarii: []
		};
		this.state = {
			group: group,
			newGroup: props.newGroup || true
		};
	}

	onValidate() {
		this.props.onHide();
	}

	formNameValidationState() {
		return this.state.group.name.length === 0 ?
			'error' :
			'success';
	}

	formNameChange(e) {
		const group = this.state.group;
		group.name = e.target.value;
		this.setState({ group: group });
	}

	render() {
		const divProps = Object.assign({}, this.props);
		delete divProps.group;
		const header = this.state.newGroup ?
			'Create a new group of scenarii' :
			'Modify a group';
		const validateButton = this.state.newGroup ?
			'Create' :
			'Alter';
		const allScenarii = this.state.group.scenarii.concat([
			{
				_id: 'oqinef',
				name: 'Aaa'
			}, {
				_id: 'qnclqk',
				name: 'Aab'
			}, {
				_id: 'kqjgoa',
				name: 'Baa'
			}, {
				_id: 'jskdoz',
				name: 'Bab'
			}
		]);
		const groupScenarii = this.state.group.scenarii;
		const scenarii = allScenarii.map(scenario => {
			const groupScenario = groupScenarii.find(s => s._id === scenario._id);
			return (<Checkbox key={scenario._id}
				checked={groupScenario}>{scenario.name}</Checkbox>);
		});
		return (
			<Modal {...divProps}>
				<Modal.Header closeButton>
					{header}
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col xs={12} md={12}>
							<form>
								<FormGroup
									validationState={this.formNameValidationState()}>
									<ControlLabel>Group name</ControlLabel>
									<FormControl type="text"
										placeholder="Group name"
										onChange={this.formNameChange.bind(this)}
										value={this.state.group.name} />
								</FormGroup>
							</form>
							<FormGroup>
								{scenarii}
							</FormGroup>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.onValidate.bind(this)}>{validateButton}</Button>
					<Button onClick={this.props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}