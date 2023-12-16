import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import LandingIntro from './LandingIntro';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';

function ForgotPassword() {

    const [linkSent, setLinkSent] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please Enter valid email address').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const url = 'http://localhost:3001/auth/forgot-pass';
                const { data: res } = await axios.post(url, values);
                if (res.status === 200) {
                    setLinkSent(true);
                }

                toast[res.status === 200 ? 'success' : 'error'](res.message);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Invalid email or password. Please try again.');
                }
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center  yellowBg">
            <div className="card mx-auto w-full w-96 shadow-xl">
                <div className="grid md:grid-row-1 grid-row-1 authBg rounded-xl">
                    <div className="py-5 px-5">
                        <LandingIntro />
                        <h2 className="text-2xl font-semibold mb-2 text-center">Forgot Password</h2>
                        {linkSent && (
                            <>
                                <div className="text-center mt-8">
                                    <CheckCircleIcon className="inline-block w-32 iconColor" />
                                </div>
                                <p className="my-4 text-xl font-bold text-center">Link Sent</p>
                                <p className="mt-4 mb-8 font-semibold text-center">Check your email to reset password</p>
                                <div className="text-center mt-4">
                                    <Link to="/login">
                                        <button className="btn btn-block btn_green">Login</button>
                                    </Link>
                                </div>
                            </>
                        )}

                        {!linkSent && (
                            <>
                                <p className="my-8 font-semibold text-center">We will send a password reset link to your email Id</p>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <div className={`form-control w-full mt-4 ${formik.errors.email && formik.touched.email ? 'has-error' : ''}`}>
                                            <label className={`label`}>
                                                <span className={`label-text ${formik.errors.email && formik.touched.email ? 'text-red-500' : ''} `}>Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                required
                                                className={`input input-bordered w-full ${formik.errors.email && formik.touched.email ? 'input-error' : ''}`}
                                            />
                                            {formik.errors.email && formik.touched.email && (
                                                <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <button type="submit" className={`btn mt-2 w-full btn_green ${formik.isSubmitting ? 'loading' : ''}`}>
                                        Send Reset Link
                                    </button>
                                    <div className="text-center mt-4">
                                        Don't have an account yet?{' '}
                                        <Link to="/register">
                                            <button className="inline-block aLink hover:cursor-pointer transition duration-200">
                                                Register
                                            </button>
                                        </Link>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
