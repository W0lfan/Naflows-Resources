import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import "../../@styling/components/input.scss";

export default function Input ({
    oninput = () => {},
    defaultValue = "",
    placeholder = "",
    fillCondition = (e) => {
        return e.length > 0;
    }
}) {
    const [IN, setIn] = useState(false);
    const [filled, setFilled] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            if (filled) {
                setIn(true);
            } else {
                setIn(false);
            }
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
        <>
            <div className={`input ${IN ? "in" : ""}`}>
                <input
                    onInput={(event) => {
                        oninput();
                        console.log(event.target.value,
                            fillCondition(event.target.value)
                        );
                        if (fillCondition(event.target.value)) {
                            setFilled(true);
                        } else {
                            setFilled(false);
                        }
                    }}
                    onBlur={() => {
                        if (filled) {
                            setIn(true);
                        } else {
                            setIn(false);
                        }
                    }}
                    type="text"
                ></input>
                <label>{placeholder}</label>

            </div>
        </>
    )
}


Input.propTypes = {
    oninput: PropTypes.func,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    fillCondition: PropTypes.func
};




