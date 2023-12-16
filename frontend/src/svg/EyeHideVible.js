import React from 'react';

const EyeHideVible = () => {
    return (
        <svg className="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="12" r="2" />
            <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
            <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
        </svg>
    );
};

export default EyeHideVible;
