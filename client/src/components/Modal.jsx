import React, { useRef, useEffect } from "react";

// Components
import Button from "./Button";
import Heading from "./Heading";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const modalOverlayRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleModalOverlay);

    return () => {
      document.removeEventListener("click", handleModalOverlay);
    };
  }, []);

  const handleModalOverlay = (event) => {
    const isOverlayClicked = modalOverlayRef.current.contains(event.target);

    if (isOverlayClicked) {
      onClose();
    }
  };

  return (
    <div
      ref={modalOverlayRef}
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 flex items-center justify-center p-6 z-50 bg-neutral-950/20 dark:bg-neutral-950/20`}
    >
      <div className="flex flex-col gap-16 rounded-2xl shadow-md p-8 md:p-16 text-center bg-white dark:bg-neutral-900">
        <Heading size="md">{title}</Heading>
        <p>{message}</p>
        <div className="grid grid-rows-2 gap-8 md:grid-rows-none md:grid-cols-2">
          <Button variant="secondary" onClick={onConfirm}>
            Accept
          </Button>
          <Button variant="primary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
