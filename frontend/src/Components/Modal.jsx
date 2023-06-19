import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

export default function Modal({ closeConfirmModal }) {
  return (
    <dialog className="backgroundModal" aria-modal="true" aria-hidden="true">
      <div id="confirmation" className="modal" role="dialog">
        <span>Employee Created!</span>
        <button
          onClick={closeConfirmModal}
          className="closeBtn"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </dialog>
  );
}
