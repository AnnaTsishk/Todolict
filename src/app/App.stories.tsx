import React from "react";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import App1 from "./App1";


export default {
    title: 'App1 Component',
    component: App1,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return   <App1/>
}