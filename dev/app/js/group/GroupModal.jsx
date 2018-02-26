import React from 'react';
import { Modal, Button, Col, FormControl } from 'react-bootstrap';

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

	render() {
		const divProps = Object.assign({}, this.props);
		delete divProps.group;
		const header = this.state.newGroup ?
			'Create a new group of scenarii' :
			'Modify a group';
		const validateButton = this.state.newGroup ?
			'Create' :
			'Alter';
		const scenarii = this.state.group.scenarii.map(scenario =>
			<li key={scenario._id}>{scenario.name}</li>);
		return (
			<Modal {...divProps}>
				<Modal.Header closeButton>
					{header}
				</Modal.Header>
				<Modal.Body>
					<Col xs={12} md={12}>
						<FormControl type="text"
							value={this.state.group.name} />
						<ul>
							{scenarii}
						</ul>
					</Col>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.onValidate.bind(this)}>{validateButton}</Button>
					<Button onClick={this.props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}