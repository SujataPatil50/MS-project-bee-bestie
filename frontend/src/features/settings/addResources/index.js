import React, { useRef, useState } from 'react';
import TitleCard from "../../../components/Cards/TitleCard"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { addProfileImage } from "../../../apis/apis";
import axios from 'axios';
import { } from '../../../mediaQuery.css'



const AddResources = () => {
    const userId = localStorage.getItem("userId");

    const ResourcesTypes = [
        "mentalHealth",
        "wellnessEducation",
        "communicationResources",
        "meetUs",
        'counsellingServices',
        'discussionFormus',
        'healthAlerts',
    ]

    const formik = useFormik({
        initialValues: {
            title: '',
            type: '',
            description: '',
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const url = 'http://localhost:3001/resources/add-resources';
                let response = await axios.post(url, values);
                if (profileImage) {
                    const formData = new FormData();
                    formData.append("resourcesImages", profileImage);
                    formData.append("id", userId);
                    response = await addProfileImage(formData);
                }
                if (response.data.status === 200) {
                    toast.success(response.data.message);
                } else if (response.data.status === 400) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error('User already exists. Please use a different email or description.');
                }
            }
            setSubmitting(false);
        },
    });
    const [profileImage, setProfileImage] = useState();

    const [imagePreview, setImagePreview] = useState("");

    const profilePic = () => {
        fileInputRef.current.click();
    };
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const imagePreview = e.target.files[0];
        setProfileImage(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(imagePreview);
    };
    return (
        <TitleCard title="Add Resource" topMargin="mt-2">
            <div>
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <input type='file' id="imageUpload" ref={fileInputRef} onChange={handleFileChange} accept=".png, .jpg, .jpeg" />
                        <label for="" onClick={profilePic}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 upload-button">
                            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                            <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                        </label>
                    </div>
                    <div className="avatar-preview">
                        <div id="imagePreview" style={{
                            backgroundImage: `url(${imagePreview})`,
                            overflow: 'hidden',
                        }}>
                            {imagePreview && <img src={imagePreview} alt="Preview" />}
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit}>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 `}>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={`label-text text-base-content`}>Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            required
                            className={`input input-bordered w-full`}
                        />
                    </div>
                    <div className={`form-control w-full `}>
                        <label className="label">
                            <span className={`label-text text-base-content  `}>Type</span>
                        </label>
                        <select
                            className="input input-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                            name="type"  // Add this line to specify the field name
                            required
                        >
                            <option value="" label="Select a type" />
                            {ResourcesTypes.map((resourceType, typeIndex) => (
                                <option key={typeIndex} value={resourceType}>{resourceType}</option>
                            ))}
                        </select>

                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={`label-text text-base-content `}>Description</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="Description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            required
                            className={`textarea textarea-bordered w-full `}
                        />
                    </div>

                </div>
                <button className={`mt-5 btn btn_green float-left ${formik.isSubmitting ? 'loading' : ''}`} type="submit">Add Resources</button>
            </form>
        </TitleCard>
    )
}
export default AddResources