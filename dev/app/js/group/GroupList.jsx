import React from 'react';
import { Row, Col, PageHeader, Accordion, Button } from 'react-bootstrap';
import Loader from 'react-loader';
import Group from './Group';
import GroupModal from './GroupModal';
import axios from 'axios';

const REFRESH_TEMPO = 10000;
const BASE_URL = `${location.protocol}//${location.hostname}${location.port ? ':'+location.port : ''}`;

export default class GroupList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			groups: [],
			loaded: false,
			loadedAtLeastOnce: false,
			groupModalShow: false
		};

		this.groupModal = null;
	}

	updateGroups() {
		this.setState({ loaded: false });

		new Promise(resolve => {
			//axios.get(`${BASE_URL}/api/group`, { headers: {'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`}})
			resolve([{
				_id: 'qjdvnkqdvbkqdbcn',
				name: 'aaa',
				scenarii: [{
					_id: 'oqinef',
					name: 'Aaa'
				}, {
					_id: 'qnclqk',
					name: 'Aab'
				}]
			}, {
				_id: 'lsdkudusvhkqdcuq',
				name: 'bbb',
				scenarii: [{
					_id: 'kqjgoa',
					name: 'Baa'
				}, {
					_id: 'jskdoz',
					name: 'Bab'
				}]
			}]);
		})
			.then(fetchGroups => {
				this.setState({
					groups: fetchGroups,
					loaded: true,
					loadedAtLeastOnce: true
				});
			})
			.catch(error => {
				this.setState({ loaded: true });
			});
	}

	componentWillMount() {
		let interval = setInterval(() => this.updateGroups(), REFRESH_TEMPO);
		this.setState({
			loadedAtLeastOnce: true,
			intervalId: interval
		});
		this.updateGroups();
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	onAddGroup() {
		this.setState({ groupModalShow: true });
	}

	onModifyGroup(groupId) {
		const group = this.state.groups.find((group) => group._id === groupId);
		if (group) {
			this.setState({
				groupModalShow: true,
				groupModalValue: group
			});
			this.groupModal.setState({ group: group });
		}
	}

	render() {
		let groups;
		if (this.state.groups.length) {
			groups = this.state.groups.map((group, i) =>
				<Group index={i + 1} group={group} onModify={() => this.onModifyGroup(group._id)} key={group._id} eventKey={i} />);
		} else {
			groups = (
				<div>
					No group found. Create a group by pushing <b>new group</b> button.
				</div>
			);
		}
		return (
			<div>
				<Row>
					<Col xs={12} md={8} >
						<PageHeader>Your groups</PageHeader>
					</Col>
					<Col xs={12} md={1} >
						<Loader loaded={this.state.loadedAtLeastOnce}></Loader>
					</Col>
					<Col xs={12} md={3} >
						<Button onClick={this.onAddGroup.bind(this)}>New group</Button>
					</Col>
					<Col xs={12} md={12} >
						<Accordion>{groups}</Accordion>
					</Col>
				</Row>
				<GroupModal ref={modal => this.groupModal = modal} show={this.state.groupModalShow} onHide={() => this.setState({ groupModalShow: false })} group={this.state.groupModalValue} />
			</div>
		);
	}
}