import React from 'react'
import { parse } from '@babel/parser'
import generate from '@babel/generator'
import R from 'ramda'
import ObjectInspector from 'react-object-inspector'

const S = {
  container: {
    fontFamily: 'monospace',
    textAlign: 'left',
    minHeight: '18px',
    lineHeight: '18px',
    fontSize: '15px',
    color: '#888',
    boxSizing: 'border-box'
  },
  error: {
    color: 'darkred'
  },
  output: {
    paddingLeft: 5
  },
  children: {
    //marginLeft: 5,
    paddingLeft: 5
    //borderLeft: '2px solid #c1a7a7'
  }
}
class Output extends React.Component {
  state = { output: '', error: null }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.input !== this.props.input ||
      nextProps.props !== this.props.props
    ) {
      this.run(nextProps)
    }
  }
  componentDidMount() {
    this.run(this.props)
  }
  run(props) {
    let ast = null
    let error = null
    let code = ''
    try {
      var parser = new DOMParser()
      var dom = parser.parseFromString(
        '<!doctype html><body>' + props.input,
        'text/html'
      )
      code = dom.body.textContent
      const fnString = 'function consoleFn(props) { return ' + code + '}'
      ast = parse(fnString)
    } catch (err) {
      error = err
    }
    if (error) {
      this.setState({ error })
    } else {
      try {
        const fn = new Function('props', 'return ' + code)
        const result = fn(props.props)
        const output = result
        this.setState({ output, error: null })
      } catch (error) {
        this.setState({ error })
      }
    }
  }
  render() {
    const { children } = this.props
    const { error, output } = this.state
    return (
      <React.Fragment>
        {error && (
          <pre style={{ ...S.container, ...S.error }}>
            Error: <ObjectInspector data={error} />
          </pre>
        )}
        {!error && (
          <div style={S.output}>
            <ObjectInspector data={output} />
          </div>
        )}
        {typeof children === 'function' && (
          <div style={S.children}>{children({ output: output })}</div>
        )}
      </React.Fragment>
    )
  }
}

export default Output
