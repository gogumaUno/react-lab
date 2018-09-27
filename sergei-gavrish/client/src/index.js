import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import store from './configureStore';
import './index.css';

ReactDOM.render(<App store={store} />, document.getElementById('root'));

registerServiceWorker();
