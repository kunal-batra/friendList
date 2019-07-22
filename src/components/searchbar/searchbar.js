import React from 'react'

const Searchbar = (props) => {

    function enterPressed(event) {
        let keyCode = event.which || event.keyCode;
        if (keyCode === 13 && event.target.value.trim() !== '') {
            let friendDetails = {
                name: event.target.value,
                id: props.id,
                sex: ''
            }
            props.nameEntered(friendDetails)
            event.target.value = ''
        }
    }

    return (
        <div className="searchbar-div">
            <input className="searchbar" type="text" placeholder="Type the name of a friend" onKeyPress={(e) => enterPressed(e)} />
        </div>
    )
}

export default Searchbar