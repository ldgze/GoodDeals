import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function DeleteDeal({ dealId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      try {
        const response = await fetch(`/api/deals/id/${dealId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Deal deleted successfully");
          navigate("/");
        } else {
          alert("Failed to delete the deal");
        }
      } catch (error) {
        alert("Error deleting deal");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
}

DeleteDeal.propTypes = {
  dealId: PropTypes.string.isRequired,
};
