const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure?
        </h2>

        <p className="text-sm mb-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;