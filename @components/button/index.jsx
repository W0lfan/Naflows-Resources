import PropTypes from "prop-types";

import "../../@styling/components/button.scss";


export default function Button({
    onclick = () => {},
    type='tertiary',
    style={},
    content=[]
}) {
    return (
        <button style={style} onClick={onclick} className={type}>
            {content}
        </button>
    )
}

Button.propTypes = {
    onclick: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.object,
    content: PropTypes.array
};