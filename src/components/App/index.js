import React from 'react'
import {Card} from 'react-bootstrap'

const App = () => (
  <div className="container">
    <div className="row mt-5">
      <div className="col-md-6 mx-auto">
        <h1 className="text-center mb-3">Gallereasy</h1>
        <Card>
          <Card.Header>Some header.</Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-4 text-muted">
              Some subtitle.
            </Card.Subtitle>
            <Card.Text>Some Body text</Card.Text>
            <Card.Link className="text-success" href="!#">
              Some Link
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
)

export default App
