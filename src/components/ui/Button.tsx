import React, { PropsWithChildren, useMemo } from "react"
import { ButtonColours, ButtonShapes } from "../../types/button"

interface ButtonProps {
  shape?: keyof typeof ButtonShapes
  colour?: keyof typeof ButtonColours
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  onClick: () => void
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  shape = "roundedRect",
  colour = "black",
  type = "button",
  disabled = false,
  onClick,
  children,
}) => {
  const bgColourStyle = useMemo(() => ButtonColours[colour], [colour])
  const shapeStyle = useMemo(() => ButtonShapes[shape], [shape])
  return (
    <button
      type={type}
      className={`inline-block px-6 pb-2 pt-2.5 font-medium uppercase
        shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600
        hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600
        focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none
        focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
        dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
        dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
        dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
        dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] w-full ${bgColourStyle} ${shapeStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
