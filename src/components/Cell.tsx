import React, { PropsWithChildren } from "react"
import { ReactComponent as FlagIcon } from "../icons/flag.svg"
import { ReactComponent as MineIcon } from "../icons/mine.svg"
import { ReactComponent as BoomIcon } from "../icons/boom.svg"

interface CellWrapperProps {
  opened?: boolean
  explosion?: boolean
}

const CellWrapper: React.FC<PropsWithChildren<CellWrapperProps>> = ({
  children,
  opened = false,
  explosion = false,
}) => (
  <div
    className={`w-7 h-7 mont flex justify-center items-center field-cell overflow-hidden ${
      opened ? "bg-white opened" : "bg-neutral-300"
    } ${explosion ? "explosion" : ""}`}
  >
    {children}
  </div>
)

interface CellProps {
  value: number
  isOpened: boolean
  isMarked: boolean
  isExplosion: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Cell: React.FC<CellProps> = ({
  value,
  isOpened,
  isMarked,
  isExplosion,
  onClick,
}) => {
  if (isExplosion) {
    return (
      <div onClick={onClick} onContextMenu={onClick} className="bg-neutral-200">
        <CellWrapper explosion opened>
          <div className="w-6 h-6 mt-1">
            <BoomIcon />
          </div>
        </CellWrapper>
      </div>
    )
  }
  if (isOpened) {
    return (
      <div onClick={onClick} onContextMenu={onClick}>
        <CellWrapper opened>
          {value === -1 ? (
            <div className="w-6 h-6 mt-1">
              <MineIcon />
            </div>
          ) : (
            <span className="text-xl select-none">{value || ""}</span>
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
