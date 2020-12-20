import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import credential from "../credentials.json"

export default class ExercisesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
    }
    this.deleteExercise = this.deleteExercise.bind(this)
  }
  deleteExercise(id) {
    axios.delete(credential.DELETE_EXERCISE + id).then(response => {
      console.log(response.data)
      this.setState({
        exercises: this.state.exercises.filter(exercise => exercise._id !== id),
      })
    })
  }
  componentDidMount() {
    axios
      .get(credential.GET_EXERCISES)
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className='table bg-light'>
          <thead className='thead-light'>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((currentExercise, index) => {
              return (
                <tr key={currentExercise._id}>
                  <td>{index + 1}</td>
                  <td>{currentExercise.username}</td>
                  <td>{currentExercise.description}</td>
                  <td>{currentExercise.duration}</td>
                  <td>{currentExercise.date.substring(0, 10)}</td>
                  <td>
                    <Link to={"/edit/" + currentExercise._id}>edit</Link> |
                    <a
                      href='#'
                      onClick={() => {
                        this.deleteExercise(currentExercise._id)
                      }}
                    >
                      {" "}
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
