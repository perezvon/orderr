import React from 'react'
import Radium from 'radium'

const styles = {
    display: 'inline-block',
    margin: '10px',
    width: '200px',
    height: '180px',
    'backgroundColor': '#8fbe88',
    color: 'white',
    fontSize: '18px',
    textAlign: 'center',
    paddingTop: '70px',
    border: '1px solid #888',
    transition: 'all 0.5s',
    boxShadow: '1px 1px 1px #888',
    ':hover': {
      backgroundColor: 'rgb(63, 120, 100)'
    }
}

const Box = ({content}) => (
  <div style={styles}>{content}</div>
)

export default Radium(Box)
