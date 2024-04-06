const InputBox = ({ placeholder, label, onChange, type }) => {
  return (
    <div className="px-2">
      <div className="text-sm font-medium text-left py-1">{label}</div>
      <input
        type={type ? type : "text"}
        onChange={onChange}
        className="w-full py-1 placeholder:text-sm px-1 rounded-md focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
