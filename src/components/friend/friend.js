import React from "react";

class Friend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            starredFriend: false
        }
    }

    starIconClick() {
        this.setState((prevState) => {
            return { starredFriend: !prevState.starredFriend }
        })
    }

    render() {
        return (
            <div className="friend-div">
                <div className="friend-info">
                    <p className="friend-name">{this.props.friend.name}</p>
                    <p className="gender-txt">{this.props.friend.sex || ''}</p>
                </div>
                <div className="icon-container" onClick={() => this.starIconClick()}>
                    {
                        this.state.starredFriend ?
                            <img src="/assets/star.png" alt="star" title="Unmark as favourite" />
                            :
                            <img src="/assets/star-outline.png" alt="star-outline" title="Mark as favourite" />
                    }
                </div>
                <div className="icon-container" onClick={() => this.props.editClick(this.props.friend.id)}>
                    <img src="/assets/edit.png" alt="edit" title="Edit friend details" />
                </div>
                <div className="icon-container" onClick={() => this.props.deleteClick(this.props.friend.id)}>
                    <img src="/assets/delete.png" alt="delete" title="Delete friend" />
                </div>
            </div>
        )
    }
}

export default Friend