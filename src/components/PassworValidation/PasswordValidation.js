import React, {useState} from 'react';

import css from './PasswordValidation.module.css';
import {useForm} from "react-hook-form";

const PasswordValidation = () => {
    const {handleSubmit, register} = useForm();

    const [number, setNumber] = useState(0);
    const [modal, setModal] = useState(false);


    const inputValue = ({password}) => {

        if (password === '') {
            return setNumber(0);
        }
        if (password.length < 8) {
            return setNumber(1);
        }

        let strength = {
            onlyLetters: /[a-zA-Z]+/.test(password),
            onlyDigits: /[0-9]+/.test(password),
            onlySymbols: /[!@#$%=-?_^&*()]+/.test(password)
        }

        let score = 0
        if (strength.onlyLetters) score++
        if (strength.onlyDigits) score++
        if (strength.onlySymbols) score++

        switch (score) {
            case 1:
                return setNumber(2)
            case 2:
                return setNumber(3)
            case 3:
                return setNumber(4);
            default:
                break;
        }
    }

    const submit = () => {
        if (number === 4) setModal(!modal);
    }

    return (
        <div className={css.container}>
            <h1>Password Validation</h1>
            <div className={css.form_block}>
                <form onChange={handleSubmit(inputValue)} onSubmit={handleSubmit(submit)}>

                    <div className={css.input__block}>
                        <input placeholder={'Input password'} {...register('password')}
                               className={css.input}/>

                        <div className={css.password_level_block}>

                            {
                                (number === 0 && <div className={css.grey}></div>) ||
                                ((number === 1 || number === 2) && <div className={css.red}></div>) ||
                                (number === 3 && <div className={css.yellow}></div>) ||
                                (number === 4 && <div className={css.green}></div>)
                            }


                            {
                                (number === 0 && <div className={css.grey}></div>) ||
                                (number === 1 && <div className={css.red}></div>) ||
                                (number === 2 && <div className={css.grey}></div>) ||
                                (number === 3 && <div className={css.yellow}></div>) ||
                                (number === 4 && <div className={css.green}></div>)
                            }

                            {
                                ((number === 0 || number === 2 || number === 3) && <div className={css.grey}></div>) ||
                                (number === 1 && <div className={css.red}></div>) ||
                                (number === 4 && <div className={css.green}></div>)
                            }
                        </div>
                    </div>

                    <button className={number === 4 ? css.button : css.button_}>Save Password</button>
                </form>

            </div>

            {
                modal &&
                <div className={css.modal_container}>
                    <h1>Greeting!!! You have created a strong password =)</h1>
                </div>
            }
        </div>
    );
};

export {PasswordValidation};
