import React, {useState} from 'react';
import {login, register} from "../http/userHttp";
import {useNavigate} from "react-router-dom";
import {findRegisterDataError} from "../utils/auth/ValidateRegisterData";
import RegisterForm from "../components/auth/RegisterForm";
import {useContext} from "react";
import {Context} from "../index";


const RegisterPage = () => {

    const navigate = useNavigate();
    const {user} = useContext(Context)

    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const registerHandler = async (e, email, password, username) => {

        e.preventDefault()

        const validateData = await findRegisterDataError(email, username, password)

        if (Object.keys(validateData).length) {
            setValidated(true)
            setErrors(validateData)
        }
        else {
            const res = await register({email, username, password})
            setValidated(false)
            const data = await login({email, password})
            const {iat, exp, ...userData} = data
            user.setUser(userData)
            user.setIsAuth(true)
            navigate('/')
        }
    }

    return (
        <>
            <div className="auth-block">
               <RegisterForm
                   registerHandler={registerHandler}
                   errors={errors}
                   validated={validated}
               />
            </div>
        </>
    );
};

export default RegisterPage;