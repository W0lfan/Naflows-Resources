import PropTypes from 'prop-types';
import '../../@styling/components/picker.scss';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

const Picker = ({ value, onChange, options }) =>  {


    const [
        pushToLeft, setPushToLeft
    ] = useState(0);

    const [
        id, setID
    ] = useState(v4());

    useEffect(() => {
        setPushToLeft(document.getElementById(value).offsetLeft);
    }, [value])

    useEffect(() => {
        const handleResize = () => {
            setPushToLeft(document.getElementById(value).offsetLeft);
            document.getElementById(id).style.width = `${document.getElementById(value).offsetWidth}px`;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <div className="picker">
            <div className="selecter-display" id={id} style={{
                transform: `translateX(${pushToLeft-5}px)`,
                width: `${document.getElementById(value) ? document.getElementById(value).offsetWidth:0}px`
           }}></div>
            <div className="selecter">
                    {options.map(option => (
                        <div className={
                            `selection ${
                                value === option.value ? 'active' : ''
                            }`
                        } id={
                            option.value
                        } key={option.value} onClick={() => {
                            onChange(option.value)
                        }}>
                            {option.name}
                        </div>
                    ))}
            </div>
        </div>
    )
}

Picker.propTypes = {
    options: PropTypes.array,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Picker;