import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';

import App from './components/App';
import drizzleOptions from './drizzleOptions';
import store from './store';


const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <Provider store={store}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    return <App drizzleContext={drizzleContext}/>
                }}
            </DrizzleContext.Consumer>
        </Provider>
    </DrizzleContext.Provider>,
    document.querySelector("#root")
);