// src/components/ConfirmDialog.jsx
import React from "react";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center hover:bg-black/30 ">
      
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onCancel}
      >

      </div>

      {/* modal */}
      <div className="relative bg-white rounded-2xl p-6 w-80 shadow-2xl z-50 w-100 ">
        <p className="text-gray-800 mb-6">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
