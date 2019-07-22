import React from 'react';
import './App.css';
import Header from '../components/header/header';
import Searchbar from '../components/searchbar/searchbar';
import Friend from '../components/friend/friend';
import Popup from '../components/popup/popup';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			FriendList: [],
			uniqueId: 1,
			showPopup: false,
			genderValue: '',
			inputValue: '',
			editFriendId: '',
			page: 0
		}
	}

	nameEntered(friendDetails) {

		let page = this.state.page
		let pageCount = (this.state.FriendList.length + 1) % 2

		if (pageCount !== 0) {
			page = page + 1
		}

		this.setState({
			FriendList: [...this.state.FriendList, friendDetails],
			uniqueId: this.state.uniqueId + 1,
			page: page
		})
	}

	deleteClick = (friendId) => {
		let updatedFriendList = this.state.FriendList.filter(friend => {
			return friend.id !== friendId
		})
		this.setState({ FriendList: [...updatedFriendList] })
	}

	editClick = (friendId) => {
		this.setState({ showPopup: true, editFriendId: friendId })
		for (let friend of this.state.FriendList) {
			if (friend.id === friendId) {
				this.setState({ inputValue: friend.name.trim(), genderValue: friend.sex || '' })
			}
		}
	}

	closeClick = () => {
		this.setState({ showPopup: false })
	}

	updateClick(updatedName, updatedSex) {
		if (updatedName) {
			let friendDetails = {
				name: updatedName,
				id: this.state.editFriendId,
				sex: updatedSex
			}
			let tempList = [...this.state.FriendList]
			let requiredIndex = this.state.FriendList.findIndex(friend => friend.id === this.state.editFriendId)
			tempList[requiredIndex] = { ...friendDetails }
			this.setState({ FriendList: [...tempList], showPopup: false })
		}
	}

	nextBtnClick() {
		let dataLength = this.state.FriendList.length
		let pageLimit = Math.ceil(dataLength / 2);
		if (this.state.page < pageLimit) {
			this.setState((prevState) => {
				return { page: prevState.page + 1 }
			})
		}
	}

	prevBtnClick() {
		if (this.state.page > 1) {
			this.setState((prevState) => {
				return { page: prevState.page - 1 }
			})
		}
	}

	getVisibleDataList() {
		let dataList = [];
		let listcount = this.state.page * 2
		this.state.FriendList.map((friend, key) => {
			if (key >= listcount - 2 && key <= listcount - 1) {
				dataList.push(friend)
			}
		})
		return dataList
	}

	render() {
		let dataList = this.getVisibleDataList()
		return (
			<React.Fragment>
				<div className="app">
					<Header title="The FriendList" />
					<Searchbar title="searchbar" nameEntered={this.nameEntered.bind(this)} id={this.state.uniqueId} />
					<div className="friendlist-container">
						{
							dataList && dataList.length ?
								dataList.map((friend, index) => {
									return <Friend key={index} friend={friend} deleteClick={this.deleteClick} editClick={this.editClick} />
								})
								:
								this.state.FriendList && this.state.FriendList.length ?
									<div className="empty-text-div">
										<p className="empty-text">Please click on previous icon button to go to previous page.</p>
									</div> :
									<div className="empty-text-div">
										<p className="empty-text">Your friendlist is empty. Please enter a name above to add a new friend.</p>
									</div>
						}
					</div>
					{
						this.state.showPopup ?
							<Popup closeClick={this.closeClick} updateClick={this.updateClick.bind(this)} defaultName={this.state.inputValue} defaultSex={this.state.genderValue} /> : ''
					}
				</div>
				<div className="pageNo">
					<p>{this.state.page}</p>
				</div>
				{
					this.state.page && this.state.page > 0 ?
						<div className="pagination-div">
							<div className="prev-icon" onClick={() => this.prevBtnClick()}>
								<img src="/assets/next.png" alt="previous" />
							</div>
							<div className="next-icon" onClick={() => this.nextBtnClick()}>
								<img src="/assets/next.png" alt="next" />
							</div>
						</div> : ''
				}
			</React.Fragment>
		);
	}
}

export default App;