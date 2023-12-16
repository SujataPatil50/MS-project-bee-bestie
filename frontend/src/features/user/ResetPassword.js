import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import LandingIntro from './LandingIntro';
import EyeVisible from '../../svg/EyeVisible';
import EyeHideVible from '../../svg/EyeHideVible';

function ResetPassword() {
    const history = useNavigate();
    const [token, setToken] = useState()
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility


    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .matches(
                strongPasswordRegex,
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
            )
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const url = 'http://localhost:3001/auth/reset-pass';
                const { data: res } = await axios.post(url, {
                    token: token,
                    password: values.password,
                });
                toast[res.status === 200 ? 'success' : 'error'](res.message);


                res.status === 200 && history('/login');
            } catch (error) {
                // Handle errors and update the state with the error message
                // setError(error.response ? error.response.data.message : 'Something went wrong. Please try again later.');
            }
        },
    });

    useEffect(() => {
        // Get the URL from the browser
        const currentUrl = window.location.href;

        // Function to extract token from URL
        function extractTokenFromURL(url) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const token = urlParams.get('token');
            return token;
        }

        // Call the function to extract the token
        const token = extractTokenFromURL(currentUrl);
        setToken(token)
    }, []);

    return (
        <div className="min-h-screen flex items-center yellowBg">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-row-1 grid-row-1 authBg rounded-xl">
                    <div className="py-5 px-5">
                        <LandingIntro />
                        <h2 className="text-2xl font-semibold mb-2 text-center">Reset Password</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={`form-control w-full mt-4 ${formik.touched.password && formik.errors.password ? 'has-error' : ''}`}>
                                <label className={`label`}>
                                    <span className={`label-text ${formik.touched.password && formik.errors.password ? 'text-red-500' : ''} `}>Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`input input-bordered w-full ${formik.touched.password && formik.errors.password ? 'input-error' : ''
                                            }`}
                                    />
                                    <label
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute right-4 top-2 cursor-pointer"
                                    >
                                        {passwordVisible ? <EyeHideVible /> : <EyeVisible />}
                                    </label>
                                </div>

                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-500 mt-2">{formik.errors.password}</div>
                                )}</div>

                            <div className={`form-control w-full mt-4 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'has-error' : ''}`}>
                                <label className={`label`}>
                                    <span className={`label-text ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'text-red-500' : ''} `}>Confirm Password</span>
                                </label>
                                <div className='relative'>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`input input-bordered w-full ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''
                                            }`}
                                    />
                                    <label
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute right-4 top-2 cursor-pointer"
                                    >
                                        {passwordVisible ? <EyeHideVible /> : <EyeVisible />}
                                    </label>
                                </div>

                            </div>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="text-red-500 mt-2">{formik.errors.confirmPassword}</div>
                            )}
                            <button
                                type="submit"
                                className={`btn mt-2 w-full btn_green mt-6`}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Changing Password...' : 'Change Password'}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            Don't have an account?{' '}
                            <Link to="/register">
                                <span className="inline-block aLink hover:cursor-pointer transition duration-200">
                                    Register
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
