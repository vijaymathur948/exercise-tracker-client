import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import credential from "../credentials.json"

export default class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersList: [],
    }
    this.deleteUser = this.deleteUser.bind(this)
  }
  deleteUser(id) {
    axios.delete(credential.DELETE_USER + id).then(response => {
      console.log(response.data)
      this.setState({
        usersList: this.state.usersList.filter(users => users._id !== id),
      })
    })
  }
  componentDidMount() {
    axios
      .get(credential.GET_USERS)
      .then(response => {
        this.setState({ usersList: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <h3>Logged Users</h3>
        <table className='table bg-light'>
          <thead className='thead-light'>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersList.map((currentUser, index) => {
              return (
                <tr key={currentUser._id}>
                  <td>{index + 1}</td>
                  <td>{currentUser.username}</td>
                  <td>
                    <a
                      href='#'
                      onClick={() => {
                        this.deleteUser(currentUser._id)
                      }}
                    >
                      delete
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
