import React from 'react';
import { Panel, Row, Col, Button } from 'react-bootstrap';

export default class Group extends React.Component {
	constructor(props) {
		super(props);
		let group = this.props.group;

		this.state = {
			group: group,
			onModify: props.onModify ||  null,
			onDelete: props.onDelete ||  null
		};
	}

	onModify() {
		this.state.onModify & this.state.onModify();
	}

	onDelete() {
		this.state.onDelete & this.state.onDelete();
	}

	render() {
		const divProps = Object.assign({}, this.props);
		delete divProps.group;
		delete divProps.index;
		delete divProps.onModify;
		delete divProps.onDelete;
		const name = this.state.group.name;

		const scenarii = this.state.group.scenarii.map(scenario =>
			<li key={scenario._id}>{scenario.name}</li>);

		const header = `${name}`;
		return (
			<Panel header={header} {...divProps}>
				<Row>
					<Col xs={12} md={8}>
						<h2>Scenarii</h2>
						<ul>
							{scenarii}
						</ul>
					</Col>
					<Col xs={12} md={2}>
						<Button onClick={this.onModify.bind(this)}>Modify</Button>
					</Col>
					<Col xs={12} md={2}>
						<Button onClick={this.onDelete.bind(this)}>Delete</Button>
					</Col>
				</Row>
			</Panel>
		);
	}
}