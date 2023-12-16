import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import TitleCard from "../../components/Cards/TitleCard";
import PopUp from "../../components/Modal/index";
import {  } from "../../mediaQuery.css";


function Leads(props) {
    const [leads, setLeads] = useState([]);
    // const { profilePhotoUrl } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Fetch data from the API when the component mounts
        axios.get('http://localhost:3001/users/user-list')
            .then((response) => {
                // Extract the 'data' array from the API response
                const leadsData = response.data.data;
                setLeads(leadsData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Function to delete a user
    const deleteCurrentUser = (userId) => {
        // Make a DELETE request to the delete user API
        axios
            .delete(`http://localhost:3001/users/delete-user?userId=${userId}`)
            .then(() => {
                // Remove the deleted user from the 'leads' state
                setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== userId));
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <>
            {/* Leads List in table format loaded from state after API call */}
            <TitleCard title="Total Users" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <table className="border table w-full">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email Id</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Status</th>
                                <th scope="col">Assigned To</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr key={lead._id}>
                                    <td data-label="Name">
                                        <div className="font-bold sm:block md:block lg:hidden">{lead.userName}</div>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                {/* <div className="mask mask-squircle w-12 h-12">
                                                    {profilePhotoUrl ? (
                                                        <img src={lead.profileImage} alt="User Profile" />
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-10">
                                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0   01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div> */}
                                                <div className="mask mask-squircle w-6 h-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-10">
                                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                                    </svg>
                                                    {/* <img src={lead.profileImage} alt="Avatar" /> */}
                                                </div>
                                            </div>
                                            <div className='hidden md:block'>
                                                <div className="font-bold">{lead.userName}</div>
                                                {/* <div className="text-sm opacity-50">{lead.email}</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Email">{lead.email}</td>
                                    <td data-label="Created At">{moment(lead.createdAt).format('DD MMM YY')}</td>
                                    <td data-label="Status"><span className='p-2  inset-0 bg-red-200 opacity-90 rounded-full'>{lead.userName}</span></td>
                                    <td data-label="Delete">
                                        <button className="btn bg_red btn_green">
                                            <TrashIcon onClick={openModal} className="w-5" />
                                        </button>
                                        <PopUp isOpen={isModalOpen} onClose={closeModal}>
                                            <h1 className="text-xl font-bold">Are you sure?</h1>
                                            <p>You are about to delete {lead.email}.</p>
                                            <div className='flex justify-end'>
                                                <button  onClick={() =>  deleteCurrentUser(lead._id)} className="mt-4 mr-1 bg-red-500 bg_red btn_green text-white px-4 py-2 rounded">Delete</button>
                                                <button onClick={closeModal} className="mt-4 btn_green text-white px-4 py-2 rounded">Close</button>
                                            </div>
                                        </PopUp>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default Leads;
