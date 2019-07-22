import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: this.props.defaultName || '',
            genderValue: this.props.defaultSex || ''
        }
    }

    textChangeHandler(event) {
        this.setState({ inputValue: event.target.value })
    }

    setGender(event) {
        this.setState({ genderValue: event.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <div className="overlay"></div>
                <div className="popup">
                    <img src="/assets/close.png" className="close-icon" alt="close" onClick={() => this.props.closeClick()} />
                    <div className="update-form">
                        <div className="update-input mrb-15 width-100">
                            <input type="text" placeholder="Edit name" className="edit-input width-100" onChange={(e) => this.textChangeHandler(e)} defaultValue={this.state.inputValue} />
                        </div>
                        <div className="mrb-15 width-100">
                            <p className="gender-select-label">Select gender:</p>
                            <div className="radio-div" onChange={(e) => this.setGender(e)}>
                                <label htmlFor="male" className="radio-label">
                                    <input type="radio" value="male" name="gender" defaultChecked={this.state.genderValue === 'male'} id="male" /> Male
                                </label>
                                <label htmlFor="female" className="radio-label">
                                    <input type="radio" value="female" name="gender" defaultChecked={this.state.genderValue === 'female'} id="female" /> Female
                                </label>
                                <label htmlFor="nonBinary" className="radio-label">
                                    <input type="radio" value="nonBinary" name="gender" defaultChecked={this.state.genderValue === 'nonBinary'} id="nonBinary" /> Non binary
                                </label>
                            </div>
                        </div>
                        <div className="update-btn-div width-100">
                            <button className="update-btn" onClick={() => this.props.updateClick(this.state.inputValue, this.state.genderValue)}>Update</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Popup