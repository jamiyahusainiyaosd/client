import React from "react";
import authorityInfo from "../../../constants/authority.contants";
import Authority from "./Authority";

const Authorities = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {authorityInfo.map((item) => (
        <Authority key={item.id} name={item.name} title={item.title} />
      ))}
    </div>
  );
};

export default Authorities;