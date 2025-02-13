import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';  // Import PersistGate
import { store, persistor } from './redux/store'; // Import store and persistor
import RouteIndex from './route';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <div className="App">
            <RouteIndex />
          </div>
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
