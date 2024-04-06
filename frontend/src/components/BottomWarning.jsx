import { Link } from "react-router-dom";

const BottomWarning = ({ text, buttonText, to }) => {
  return (
    <div className="text-xs flex justify-center py-2">
      <div>{text}</div>
      <Link className="pointer underline cursor-pointer text-blue-400 px-1" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
