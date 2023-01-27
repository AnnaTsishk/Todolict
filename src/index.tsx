import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from "./app/App1";
import {Provider} from "react-redux";
import {store} from "./state/store";




// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
// root.render(
//     <React.StrictMode  >
//         <App1/>
//     </React.StrictMode>
// );


ReactDOM.render(
    <Provider store={store}>
        <App1/>
    </Provider>
    , document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

