import React from "react";

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="flex space-x-6 mb-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="role"
          value="citizen"
          checked={role === "citizen"}
          onChange={(e) => setRole(e.target.value)}
          className="mr-2"
        />
        Citizen
      </label>

      <label className="flex items-center">
        <input
          type="radio"
          name="role"
          value="official"
          checked={role === "official"}
          onChange={(e) => setRole(e.target.value)}
          className="mr-2"
        />
        Official
      </label>
    </div>
  );
};

export default RoleSelector;
