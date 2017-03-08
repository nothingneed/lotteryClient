import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()
export default function App(props) {
    console.log('children-----------' ,props)
  return (
    <MuiThemeProvider>

      <div style={{ marginTop: '1.5em' }}>{props.children}</div>
    </MuiThemeProvider>
  )
}
