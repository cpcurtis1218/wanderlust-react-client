import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'

import messages from '../auth/messages'

class DestinationCreate extends Component {
  constructor () {
    super()

    this.state = {
      destination: {
        location: '',
        contact: '',
        note: ''
      },
      created: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // destructuring the destination and props objects
    const { destination } = this.state
    const { user, alert } = this.props

    axios({
      url: `${apiUrl}/destinations`,
      method: 'post',
      data: { destination },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(response => this.setState({
        created: true,
        destination: response.data.destination }))
      .then(() => alert(messages.createSuccess, 'success'))
      .catch(() => this.setState({
        destination: { ...destination, location: '', contact: '', note: '' }
      }),
      console.log)
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)

    this.setState({ destination: {
      ...this.state.destination,
      [event.target.name]: event.target.value
    } })
  }

  render () {
    const { destination, created } = this.state

    if (created) {
      return <Redirect to="/destinations" />
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="location">Location</label>
            <input value={destination.location} name="location" className="m-1" onChange={this.handleChange} />
            <label htmlFor="contact">Contact</label>
            <input value={destination.contact} name="contact" className="m-1" onChange={this.handleChange} />
            <label htmlFor="note">Note</label>
            <input value={destination.note} name="note" className="m-1" onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default DestinationCreate
