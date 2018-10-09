import React from 'react'
import ContentEditable from 'react-contenteditable'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/seti.css'
import { parse } from '@babel/parser'
import generate from '@babel/generator'
import ObjectInspector from 'react-object-inspector'
import traverse from '@babel/traverse'
import * as t from 'babel-types'
import R from 'ramda'
// import CodeMirror from './CodeMirror'
import Highlight from 'react-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import wrapFunction from '@babel/helper-wrap-function'

const S = {
  container: {
    margin: '3px 3px',
    padding: '5px',
    width: '100%'
  }
}
const tap = ast => {
  // console.log(ast)
  try {
    traverse(ast, {
      enter(path) {
        if (t.isIdentifier(path)) {
          const calle = t.callExpression(t.identifier('tapLog'), [path])
          //path.replaceWith(calle)
        }
      }
    })
  } catch (e) {
    console.error('eRr', e)
  }

  // console.log(ast)
  return ast
}
class ConsoleV2 extends React.Component {
  state = {
    props: this.props.props || {},
    ...this.getState(this.props.initialValue)
  }
  onChange = async input => {
    const update = this.getState(input)
    this.setState(update)
  }
  getState(input) {
    const update = { input }
    try {
      const ast = tap(parse(input))
      update.ast = ast
    } catch (error) {
      update.error = error
    }
    if (!update.error && update.ast) {
      try {
        update.input2 = generate(update.ast).code
      } catch (error) {
        update.error = error
      }
    }
    return update
  }
  render() {
    return (
      <div style={S.container} className="ConsoleV2">
        <CodeMirror
          id="code1"
          value={this.state.input}
          onChange={this.onChange}
          options={{
            theme: 'seti', //'duotone-light',
            lineNumbers: false,
            mode: 'javascript'
          }}
        />
        <ObjectInspector data={this.state.ast} />
        {this.state.input2}
        <Highlight id="code2" value={this.state.input2}>
          {this.state.input2}
        </Highlight>
      </div>
    )
  }
}

export default ConsoleV2
