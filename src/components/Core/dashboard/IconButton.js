import React from 'react'
import { FaRegEdit } from "react-icons/fa";

const IconButton = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  iconsPresent,
  type
}) => {
  return (
    <button disabled={disabled}
      onClick={onclick}
       type={type}
      className={customClasses}
    >
      {
        iconsPresent ? (
          iconsPresent
        ):(<div></div>)
      }
      <span>{text}</span>
      {children && children}
    </button>
  )
}

export default IconButton
