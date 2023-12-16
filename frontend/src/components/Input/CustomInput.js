const CustomInput = ({ type = "text", label, error = false, other = {} }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span
          className={`label-text text-base-content ${
            error ? "text-red-500" : ""
          }`}
        >
          {label}
        </span>
      </label>
      <input type={type} {...other} className="input  input-bordered w-full " />
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
};

export default CustomInput;
