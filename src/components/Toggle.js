import React from 'react'
import Toggle from 'react-toggle'
import './Toggle.css'

const CustomToggle = ({ isChecked, handleThemeChange }) => (
    <Toggle
        defaultChecked={isChecked}
        onChange={handleThemeChange} />
)

export default CustomToggle;
