import React, { useState } from "react";

const Dropdown = ({btnText,option1,option2,option3,idName}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggleDropdown} type="button" className="inline-flex justify-end right-0" id="options-menu" aria-haspopup="listbox" aria-expanded="true" >
          {btnText}
        </button>
      </div>

      {isOpen && (
        <div className="expanded origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        {/* <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" id={idName}> */}
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{option1}</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{option2}</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100" role="menuitem">{option3}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
