import { useState } from "react"


function Date({labelTitle, labelStyle, type, containerStyle, defaultValue, updateFormValue, updateType}){

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "date"} value={value} onChange={(e) => updateInputValue(e.target.value)}className="input  input-bordered w-full " />
        </div>
    )
}


export default Date