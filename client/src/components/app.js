import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Chatbot from './chatbot/chatbot';
const App = function() {
    return (
        <div>
            <BrowserRouter>
            <div className="container">
              <Chatbot/>
            </div>
            </BrowserRouter>
        </div>
    )
}

export default App;