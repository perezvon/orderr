import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Box from './Box'

export const UploadType = () => (
  <Row>
    <Col md={12} className='text-center'>
      <h2>What would you like to import?</h2>
    </Col>
    <Col md={6} mdOffset={3} className='text-center'>
      <Link to='/import/order-guide'><Box content={'order guide'}/></Link>
      <Link to='/import/sales'><Box content={'sales data'}/></Link>
    </Col>
  </Row>
)
