import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'
import DeleteEvent from '../events/DeleteEvent'
import axios from 'axios';

const Profile = (props) => {

  // GET EVENTS
  let [events, setEvents] = useState([])

  useEffect(()=>{
      axios.get('http://localhost:3000/events', events)
      .then(response => {
          setEvents(response.data)
          console.log(response)
      })
      .catch(err => {
        console.log('🔥🔥🔥🔥')
        console.log(err)
      })
      console.log('call the server for bounties!')
    }, [])

  console.log(props)
  console.log(`${props.user}`)
  let userData = props.user
    ? <div>
        <h1>Profile</h1>
          <img src={props.user.avatar} alt={props.user.name} className="mb-4" />
          <p><strong>Name:</strong> {props.user.name}</p>
          <p><strong>email:</strong> {props.user.email}</p>
          <p><strong>ID:</strong> {props.user.id}</p>
          <h3>Create a <Link to='/events/create'>New Event</Link></h3>
          <div>
            <h3>Your Events</h3>
            <ul>
              {events.map((event, i) => (
                <li>
                  <Card className="mb-2" >
                  <Card.Body className="card-style">
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Link</Card.Subtitle>
                    <Card.Text>
                      {event.date}
                      {event.description}
                    </Card.Text>
                    <DeleteEvent id={event._id}/>
                  </Card.Body>
                  </Card>
                </li>
            ))}
          </ul>
        </div>
      </div>
    : <h4>Loading...</h4>

  let errorDiv = () => {
    return (
      <div className="text-center pt-4"><h3>Please <Link to='/login'>login</Link> to view this page</h3></div>
    )
  }

  return (
    <div>
      {props.user ? userData : errorDiv() }
      
    </div>
  )
}

export default Profile;