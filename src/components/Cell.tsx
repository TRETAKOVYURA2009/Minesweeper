import React, { PropsWithChildren } from "react"
import { ReactComponent as FlagIcon } from "../icons/flag.svg"
import { ReactComponent as MineIcon } from "../icons/mine.svg"

interface CellWrapperProps {
  opened?: boolean
}

const CellWrapper: React.FC<PropsWithChildren<CellWrapperProps>> = ({
  children,
  opened = false,
}) => (
  <div
    className={`w-7 h-7 numbers flex justify-center items-center field-cell overflow-hidden
    ${opened ? "bg-white opened" : "bg-neutral-300"}`}
  >
    {children}
  </div>
)

interface CellProps {
  value: number
  isOpened: boolean
  isMarked: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Cell: React.FC<CellProps> = ({ value, isOpened, isMarked, onClick }) => {
  if (isOpened) {
    return (
      <div onClick={onClick} onContextMenu={onClick}>
        <CellWrapper opened>
          {value === -1 ? (
            <div className="w-6 h-6 mt-1">
              <MineIcon />
            </div>
          ) : (
            <span className="text-xl">{value || ""}</span>
          )}
        </CellWrapper>
      </div>
    )
  }
  if (isMarked) {
    return (
      <div onClick={onClick} onContextMenu={onClick}>
        <CellWrapper>
          <div className="w-5 h-5">
            <FlagIcon />
          </div>
        </CellWrapper>
      </div>
    )
  }
  return (
    <div onClick={onClick} onContextMenu={onClick}>
      <CellWrapper />
    </div>
  )
}

export default Cell
