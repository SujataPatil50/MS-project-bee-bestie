// Modal.js
import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

function PopUp({ isOpen, onClose, children, isCloseIcon }) {
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (isOpen && e.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("click", closeOnOutsideClick);
    }

    return () => {
      window.removeEventListener("click", closeOnOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay" />
        <div className="modal-container popUp w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          {isCloseIcon ? (
            <div className="flex justify-end">
              <img
                onClick={onClose}
                className="flex flex-row absolute cursor-pointer z-50"
                src="/noIcon.png"
                alt="close"
              />
            </div>
          ) : null}
          <div
            className="modal-content py-6 text-left px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default PopUp;
