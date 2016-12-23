import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Goals from './Goals';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Goals />
      </Provider>
    );
  }
}

export default App;
