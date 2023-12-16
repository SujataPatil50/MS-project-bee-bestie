function RadioBtn({
  labelTitle,
  subTitle1,
  subTitle2,
  selectedValue,
  onSelect,
}) {
  return (
    <div className={`form-control w-full`}>
      <label className="label">
        <span className={"label-text text-base-content "}>{labelTitle}</span>
      </label>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <label className="label">
            <span className="label-text text-base-content">{subTitle1}</span>
          </label>
          <input
            type="radio"
            className="radio"
            value={subTitle1}
            checked={selectedValue === subTitle1} // Automatically select if gender is 'Male'
            onChange={() => onSelect(subTitle1)}
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="label">
            <span className={"label-text text-base-content "}>{subTitle2}</span>
          </label>
          <input
            type="radio"
            className="radio"
            value={subTitle2}
            checked={selectedValue === subTitle2} // Automatically select if gender is 'Female'
            onChange={() => onSelect(subTitle2)}
          />
        </div>
      </div>
    </div>
  );
}

export default RadioBtn;
