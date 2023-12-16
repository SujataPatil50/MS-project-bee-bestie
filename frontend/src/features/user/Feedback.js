import TitleCard from "../../components/Cards/TitleCard";
import * as Yup from "yup";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useFormik } from "formik";

function Feedback() {

    const userId = localStorage.getItem('userId');

    const formik = useFormik({
        initialValues: {
            reviewFor: "834b8df3-8693-45b1-ac2e-e02073fad278",
            reviewBy: userId,
            name: "",
            listenerName: "",
            dateOfService: "",
            avgRating: "",
            review: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            const dateOfServiceUTC = new Date(values.dateOfService + 'T00:00:00Z').toISOString();

            try {
                const response = await axios.post("http://localhost:3001/rating/add-feedback", {
                    ...values,
                    dateOfService: dateOfServiceUTC 
                });

                if (response.data.status === 200) {
                    toast.success(response.data.message);
                } else if (response.data.status === 400) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("User already exists. Please use a different email or username.");
                }
            }

            setSubmitting(false);
        },
    });


    useEffect(() => {
        axios.get(`http://localhost:3001/users/get-user-by-id?userId=${userId}`)
            .then(response => {
                const { userName } = response.data.data;

                formik.setValues({
                    ...formik.values,
                    name: userName,
                    dateOfService: new Date().toISOString().split('T')[0]
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);


    return (
        <TitleCard title="Send Feedback" topMargin="mt-2">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span
                                className={`label-text text-base-content `}
                            >
                                Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>
                                Date of Service
                            </span>
                        </label>
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="dateOfService"
                            value={formik.values.dateOfService} // Set value from formik values
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>
                                Listener Name
                            </span>
                        </label>
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            name="listenerName"
                            onBlur={formik.handleBlur}
                            value={formik.values.listenerName}
                            placeholder="Listener Name"
                            className="input  input-bordered w-full "
                        />
                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Rating</span>
                        </label>
                        <input
                            type="number"
                            onChange={formik.handleChange}
                            name="avgRating"
                            onBlur={formik.handleBlur}
                            value={formik.values.avgRating}
                            placeholder="Rating"
                            className="input  input-bordered w-full "
                        />
                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Feedback</span>
                        </label>
                        <textarea
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="review"
                            value={formik.values.review}
                            className="textarea textarea-bordered w-full"
                            placeholder="Feedback"
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className={`mt-5 btn btn_green float-left ${formik.isSubmitting ? 'loading' : ``}`}>Submit</button>
            </form>
        </TitleCard>
    );
}
export default Feedback;
