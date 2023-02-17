import React from 'react';

import css from './App.module.css';
import {PasswordValidation} from "./components";

const App = () => {

    return (
        <div className={css.container}>
            <PasswordValidation/>
        </div>
    );
}

export default App;
