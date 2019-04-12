import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

import messages from '../auth/messages'

class Destinations extends Component {
  constructor () {
    super()

    this.state = {
      destinations: []
    }
  }

  componentDidMount () {
    console.log('destinations component mounted')
    const { user } = this.props

    axios({
      url: `${apiUrl}/destinations`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(response => this.setState({
        destinations: response.data.destinations
      }))
      .catch(console.log)
  }

  handleDelete = id => {
    const { user, alert } = this.props

    axios({
      url: `${apiUrl}/destinations/${id}`,
      method: 'delete',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => alert(messages.deleteSuccess, 'success'))
      .catch(console.log)
  }

  render () {
    return (
      <Fragment>
        <Link to="/destinations-create">Add New Destination</Link>
        <div className="m-4 p-4 shadow">
          <h3>Destinations:</h3>
          <ul>
            {this.state.destinations.map(dest => (
              <li key={dest.id} className="destination">
                <p className="m-0"><u>Location:</u></p>
                <h5>{dest.location}</h5>
                <p className="m-0"><u>Contact:</u></p>
                <p>{dest.contact}</p>
                <p className="m-0"><u>Note:</u></p>
                <p>{dest.note}</p>
                <button onClick={() => { this.handleDelete(dest.id) }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </Fragment>)
  }
}
export default Destinations
