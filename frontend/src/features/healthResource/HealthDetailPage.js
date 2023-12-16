import React from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import ArrowLongRightIcon from '@heroicons/react/24/solid/ArrowLongRightIcon';

function HealthDetailPage({ data }) {
    console.log(data);

    return (
        <div>
            <TitleCard title="Help Understanding Your Mental Health and Resources">
                <div>
                    {data.map((item) => (
                        <div key={item._id} className="healthDetailCard relative flex w-full flex-row my-5 rounded-xl backColor bg-clip-border text-gray-700 shadow-md">
                            <div className="healthDetailImage relative m-0 w-40 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                                <img src={item.image} alt={item.title} className="h-40 w-40 object-cover" />
                            </div>
                            <div className="px-8 py-1.5 mt-2">
                                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">{item.title}</h4>
                                <p className="mb-px block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">{item.description}</p>
                                <Link className="inline-block" to={"/app/counselingServices"}>
                                    <button className="healthDetalBtn flex select-none items-center gap-2 rounded-lg py-2 mt-2 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-lime-500 transition-all hover:bg-lime-500/10 active:bg-lime-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                        Learn More
                                        <ArrowLongRightIcon />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </TitleCard>
        </div>
    );
}

export default HealthDetailPage;
