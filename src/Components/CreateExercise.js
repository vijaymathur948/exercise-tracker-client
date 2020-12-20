import React, { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import credential from "../credentials.json"

export default class CreateExercise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    }
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeDuration = this.onChangeDuration.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onChangeDescription(e) {
    this.setState({ description: e.target.value })
  }
  onChangeDuration(e) {
    this.setState({ duration: e.target.value })
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    })
  }
  onSubmit(e) {
    //  to prevent default behaviour of form
    e.preventDefault()

    const newExercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    }
    console.log(newExercise)
    axios
      .post(credential.CREATE_EXERCISE, newExercise)
      .then(res => console.log(res.data))

    this.setState({
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
    })
    //window.location = "/"
  }
  componentWillMount() {
    axios
      .get(credential.GET_USERS)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <select
              name=''
              id='username'
              required={true}
              className='form-control'
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description: </label>
            <input
              type='text'
              id='description'
              required={true}
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='duration'>Duration</label>
            <input
              type='text'
              id='duration'
              className='form-control'
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Date: </label>
            <div>
              <DatePicker
                id='date'
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>

            {/* <input
              type='date'
              id='date'
              value={this.state.date}
              onChange={this.onChangeDate}
            />
             */}
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create Exercise Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    )
  }
}
