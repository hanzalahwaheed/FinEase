const Balance = ({ value }) => {
  return (
    <div className="flex p-2">
      <div className="text-md font-medium">Your balance:</div>
      <div className="ml-4 text-md font-semibold">Rs {value.toFixed(2)}/-</div>
    </div>
  );
};

export default Balance;
