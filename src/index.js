import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from 'drizzle-react';
import { Drizzle, generateStore } from 'drizzle';
import App from './components/App';
import drizzleOptions from './drizzleOptions';


const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    return <App drizzleContext={drizzleContext}/>
                }}
            </DrizzleContext.Consumer>
    </DrizzleContext.Provider>,
    document.querySelector("#root")
);