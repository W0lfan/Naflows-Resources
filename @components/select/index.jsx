import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import "../../@styling/components/select.scss";

export default function Select({
  choices = [],
  selected = 0,
  setSelected,
}) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`select ${open ? "open" : ""}`}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div className="choice">
        <span>{choices[selected]}</span>
        <svg
          style={{
            transform: open ? "rotate(-90deg)" : "rotate(90deg)",
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
        </svg>
      </div>
      <div
        className="choices"
        style={{
          height: open ? `${(choices.length - 1) * (24 + 10)}px` : "0",
        }}
      >
        {choices.map((choice, index) => {
          if (index !== selected) {
            return (
              <div
                key={index}
                className="choice"
                onClick={() => {
                  setSelected(index);
                  setOpen(false);
                }}
              >
                <span>{choice}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

Select.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.number,
  setSelected: PropTypes.func.isRequired,
};
