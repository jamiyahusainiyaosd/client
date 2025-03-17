import React from "react";
import authorityInfo from "../../../constants/authority.contants";
import Authority from "./Authority";

const Authorities = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start space-y-5">
        {authorityInfo.map((item) => (
          <Authority key={item.id} name={item.name} title={item.title} />
        ))}
      </div>
    </>
  );
};

export default Authorities;