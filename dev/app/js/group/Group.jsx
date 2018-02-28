import React from 'react';
import { Panel, Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';

export default class Group extends React.Component {
	constructor(props) {
		super(props);
		let group = this.props.group;

		this.state = {
			group: group,
			onModify: props.onModify || null,
			onDelete: props.onDelete || null
		};

		this.overlay = null;
	}

	onModify() {
		this.state.onModify & this.state.onModify();
	}

	onDelete() {
		this.state.onDelete & this.state.onDelete();
		this.overlay.setState({ show: false });
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

		const popoverConfirmation = (<Popover id="popoverConfirmation">
			<p>Do you really want to delete this group ?</p>
			<Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Yes</Button>
			<Button onClick={() => this.overlay.setState({ show: false })}>No</Button>
		</Popover>);
		return (
			<Panel header={header} {...divProps}>
				<Row>
					<Col xs={12} md={10}>
						<h2>Scenarii</h2>
						<ul>
							{scenarii}
						</ul>
					</Col>
					<Col xs={12} md={2}>
						<Button onClick={this.onModify.bind(this)}>Modify</Button>
						<OverlayTrigger trigger="click" placement="top"
							ref={(overlay) => this.overlay = overlay}
							overlay={popoverConfirmation} rootClose={true}>
							<Button bsStyle="danger">Delete</Button>
						</OverlayTrigger>
					</Col>
				</Row>
			</Panel>
		);
	}
}