import React from 'react'
import ContentEditable from 'react-contenteditable'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/seti.css'

const S = {
  container: {
    fontFamily: 'monospace',
    textAlign: 'left',
    minHeight: '18px',
    lineHeight: '18px',
    fontSize: '16px',
    outline: 'none',
    marginBottom: 5,
    display: 'flex'
  }
}
class Input extends React.Component {
  render() {
    return (
      <div style={S.container}>
        <CodeMirror
          value={this.props.value}
          onChange={this.props.onChange}
          options={{
            theme: 'seti', //'duotone-light',
            lineNumbers: false,
            mode: 'javascript'
          }}
        />
      </div>
    )
  }
}

export default Input
