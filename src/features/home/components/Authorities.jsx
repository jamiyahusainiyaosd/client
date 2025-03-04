import React from "react";
import authorityInfo from "../../../constants/authority.contants";
import Authority from "./Authority";

const Authorities = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start space-y-4">
        {authorityInfo.map((item) => (
          <Authority
            key={item.id}
            brief_description={item.brief_description}
            educational_qualification={item.educational_qualification}
            name={item.name}
            title={item.title}
          />
        ))}
      </div>
    </>
  );
};

export default Authorities;
