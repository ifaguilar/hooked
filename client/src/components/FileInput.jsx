import React, { useRef } from "react";

// Components
import Button from "./Button";

const FileInput = ({ accept, variant, ...props }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        accept={accept}
        type="file"
        className="hidden"
        {...props}
      />
      <Button variant={variant} onClick={handleClick}>
        Change picture
      </Button>
    </>
  );
};

export default FileInput;
