import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/seti.css'
import R from 'ramda'

export default class Wrapper extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !R.equals(nextProps, this.props)
  }
  render() {
    return <CodeMirror {...this.props} />
  }
}
