import React, { Component } from "react"
import axios from "axios"
import credential from "../credentials.json"

export default class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
    }
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      username: this.state.username,
    }
    console.log(newUser)
    axios
      .post(credential.CREATE_USER, newUser)
      .then(res => console.log(res.data))

    //  resetting the values
    this.setState({ username: "" })
  }
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              required={true}
              id='username'
              className='form-control'
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create User'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    )
  }
}
