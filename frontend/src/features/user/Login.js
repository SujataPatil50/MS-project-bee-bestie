import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import LandingIntro from "./LandingIntro";
import axiosInstance from "../../utils/axiosInstance";
import { useUser } from "../../store/store";

function Login() {
  const navigate = useNavigate();
  const [, setUser] = useUser();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const url = "/auth/login-user";
        const { data: res } = await axiosInstance.post(url, values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data._id);
        localStorage.setItem("role", res.data.role)
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        if (res.status === 200) {
          navigate("/app/home");
          toast.success("Login successful!");
        } else if (res.status === 400) {
          toast.error(res.message);
        }
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center  yellowBg">
      <div className="card mx-auto w-full w-96 shadow-xl">
        <div className="grid md:grid-row-1 grid-cols-1 authBg rounded-xl">
          <div className="py-5 px-5">
            <LandingIntro />
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <div
                  className={`form-control w-full mt-4 ${
                    formik.errors.email && formik.touched.email
                      ? "has-error"
                      : ""
                  }`}
                >
                  <label className={`label`}>
                    <span
                      className={`label-text ${
                        formik.errors.email && formik.touched.email
                          ? "text-red-500"
                          : ""
                      } `}
                    >
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                    className={`input input-bordered w-full ${
                      formik.errors.email && formik.touched.email
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div
                  className={`form-control w-full mt-4 ${
                    formik.errors.password && formik.touched.password
                      ? "has-error"
                      : ""
                  }`}
                >
                  <label className={`label`}>
                    <span
                      className={`label-text ${
                        formik.errors.password && formik.touched.password
                          ? "text-red-500"
                          : ""
                      } `}
                    >
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                    className={`input input-bordered w-full ${
                      formik.errors.password && formik.touched.password
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm inline-block aLink hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <button
                type="submit"
                className={`btn mt-2 w-full btn_green ${
                  formik.isSubmitting ? "loading" : ""
                }`}
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?
                <Link to="/register">
                  <span className="inline-block aLink hover:cursor-pointer transition duration-200">
                    &nbsp; Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
