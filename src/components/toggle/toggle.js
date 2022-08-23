import React from "react";
import style from "./style.css";

const ToggleButton = ({ label }) => {
    return (
        <div class={style.container}>
            <div class={style.toggleSwitch}>
                <input type="checkbox" class={style.checkbox} name={label} id={label} />
                <label class={style.label} htmlFor={label}>
                    <span class={style.inner} />
                    <span class={style.swith} />
                </label>
            </div>
        </div>
    );
};

export default ToggleButton;