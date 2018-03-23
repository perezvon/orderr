import React from 'react'
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { VIEW_VENDOR, ADD_VENDOR, UPDATE_VENDOR } from '../constants/actionTypes'
import agent from '../agent'

const mapStateToProps = state => {
  return {
    vendor: state.vendor
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: VIEW_VENDOR, payload }),
  updateVendor: (payload) =>
    dispatch({type: UPDATE_VENDOR, payload }),
  createVendor: (payload) =>
    dispatch({type: ADD_VENDOR, payload })
});

class VendorDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vendor: {},
      isNew: true
    }
  }
  componentDidMount() {
    this.props.match.params.id && this.props.onLoad(agent.Vendors.get(this.props.match.params.id))
  }

  componentWillReceiveProps = (prevProps) => {
    const isNew = this.props.match.params.id ? false : true
    if (prevProps !== this.state) {
       this.setState({
        vendor: {...prevProps.vendor},
        isNew
      })
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState((prevState) =>({
        ...prevState,
        vendor: {
          ...prevState.vendor,
          [name]: value
        }
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
      let {vendor, isNew} = this.state
      console.log(vendor)
      console.log(isNew)
      if (isNew) this.props.createVendor(agent.Vendors.create(vendor))
      else this.props.updateVendor(agent.Vendors.update(vendor))
  }

  render () {
    const {vendor, isNew} = this.state;
    return (
        <form onSubmit={e => {this.handleSubmit(e)}}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Name </ControlLabel>
                <FormControl
                type='text'
                name='name'
                value={vendor.name}
                placeholder='Vendor Name'
                onChange={e => {this.handleInput(e)}}
              />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Primary Contact </ControlLabel>
                <FormControl
                type='text'
                name='contact_1'
                value={vendor.contact_1}
                placeholder='Primary Contact'
                onChange={e => {this.handleInput(e)}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="123 fake st..."
                  value={vendor.address}
                  name='address'
                  onChange={e => {this.handleInput(e)}}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Primary Contact Email</ControlLabel>
                <FormControl
                type='email'
                name='contact_email_1'
                value={vendor.contact_email_1}
                placeholder='Primary Contact Email'
                onChange={e => {this.handleInput(e)}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Button bsStyle='success' type='submit'>{isNew ? 'Add' : 'Update'} Vendor</Button>
        </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetail)
