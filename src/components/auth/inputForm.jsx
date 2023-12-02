/* eslint-disable react/no-unknown-property */

import '../styles/login.css';
import { useState } from 'react';
import PropTypes from 'prop-types';


 const InputForm = (props) => {
    const { onChange, errorMessage,  ...inputProps} = props;
    const [focused, setFocused] = useState(false);
    const handleFocus = () => {
        setFocused(true);
    };
    return (
        <>
        <input
         {...inputProps}
         onChange={onChange}
         onBlur={handleFocus}
        focused={focused.toString()}
         
        />
        <span>{errorMessage}</span>
        </>
    );
};

InputForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };


export default InputForm;
