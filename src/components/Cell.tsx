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
    className={`border-2 border-black w-7 h-7 bg-white numbers flex justify-center items-center field-cell ${
      opened ? "shadow-inner" : "bg-white"
    }`}
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
      <div onClick={onClick} onContextMenu={onClick} className="bg-neutral-200">
        <CellWrapper>
          <div className="w-5 h-5">
            <FlagIcon />
          </div>
        </CellWrapper>
      </div>
    )
  }
  return (
    <div onClick={onClick} onContextMenu={onClick} className="bg-neutral-100">
      <CellWrapper />
    </div>
  )
}

export default Cell
