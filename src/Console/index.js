import React from 'react'
import Input from './Input'
import Output from './Output'

const S = {
  container: {
    margin: '3px 3px',
    padding: '5px',
    // marginRight: -5,
    // border: '1px dashed #aeaeae',
    // border: '1px solid gray',
    borderRadius: 3,
    boxSizing: 'border-box',
    // display: 'inline-block',
    minWidth: 250,
    background: '#faf8f5'
  }
}
class Console extends React.Component {
  state = {
    input: this.props.initialValue,
    props: this.props.props || {},
    output: undefined
  }
  onChange = input => {
    this.setState({ input })
  }
  render() {
    const { children } = this.props
    return (
      <div style={S.container} className="Console">
        <Input value={this.state.input} onChange={this.onChange} />
        <Output
          props={this.props.props || {}}
          input={this.state.input}
          children={children}
        />
      </div>
    )
  }
}

export default Console
