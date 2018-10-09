import React from 'react'
import ReactDOM from 'react-dom'
import Console from './Console'
import ConsoleV2 from './Console/v2'

import './styles.css'

function App() {
  return (
    <div className="App">
      <React.Fragment>
        {/*<Console initialValue="[1,2,3,4,5,6,7,8,9,10]">
          {({ output }) => (
            <Console
              props={{ data: output }}
              initialValue={`props.data
          .reduce((a, b) => a + b, 0)`}
            >
              {({ output }) => (
                <Console
                  props={{ data: output }}
                  initialValue="props.data + 9001"
                >
                  {({ output }) => (
                    <Console
                      props={{ data: output }}
                      initialValue="props.data / 3"
                    />
                  )}
                </Console>
              )}
            </Console>
          )}
          </Console>
        */}
        <ConsoleV2 args={{ $: 30 }} initialValue="fn($ + 12)" />
      </React.Fragment>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
