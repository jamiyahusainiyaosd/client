import authorityInfo from "../../../constants/authority.contants";
import Authority from "./Authority";

const Authorities = () => {
  return (
    <div className="space-y-4">
      {authorityInfo.map((item) => (
        <Authority key={item.id} name={item.name} title={item.title} />
      ))}
    </div>
  );
};

export default Authorities;