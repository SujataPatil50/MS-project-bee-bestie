import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LandingIntro from './LandingIntro'


const Register = () => {
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Only letters are allowed for the username')
            .required('Username is required'),
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email address'
            )
            .required('Email is required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            role:'user'
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const url = 'http://localhost:3001/users/add-user';
                const response = await axios.post(url, values);
                if (response.data.status === 200) {
                    toast.success(response.data.message);
                    navigate('/login');
                } else if (response.data.status === 400) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error('User already exists. Please use a different email or username.');
                }
            }
            setSubmitting(false);
        },
    });




    return (
        <div className="min-h-screen flex items-center  yellowBg">
            <div className="card mx-auto w-full w-96 shadow-xl">
                <div className="grid  md:grid-row-1 grid-row-1 authBg rounded-xl">
                    <div className='py-5 px-5'>
                        <LandingIntro />
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <div className={`form-control w-full mt-4 ${formik.errors.userName && formik.touched.userName ? 'has-error' : ''}`}>
                                    <label className={`label`}>
                                        <span className={`label-text ${formik.errors.userName && formik.touched.userName ? 'text-red-500' : ''} `}>Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="userName"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.userName}
                                        required
                                        className={`input input-bordered w-full ${formik.errors.userName && formik.touched.userName ? 'input-error' : ''}`}
                                    />
                                    {formik.errors.userName && formik.touched.userName && (
                                        <p className="text-xs text-red-500 mt-1">{formik.errors.userName}</p>
                                    )}
                                </div>
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
                                <div className={`form-control w-full mt-4 ${formik.errors.password && formik.touched.password ? 'has-error' : ''}`}>
                                    <label className={`label`}>
                                        <span className={`label-text ${formik.errors.password && formik.touched.password ? 'text-red-500' : ''} `}>Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        required
                                        className={`input input-bordered w-full ${formik.errors.password && formik.touched.password ? 'input-error' : ''}`}
                                    />
                                    {formik.errors.password && formik.touched.password && (
                                        <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
                                    )}
                                </div>

                            </div>

                            <button type="submit" className={`btn mt-2 w-full btn_green ${formik.isSubmitting ? 'loading' : ''}`}>
                                Register</button>

                            <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  aLink hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
