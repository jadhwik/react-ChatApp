import React from "react";

const ImageOpen = ({ imageUrl, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content">
        <img src={imageUrl} alt="Large Image" />
      </div>
    </div>
  );
};

export default ImageOpen;
