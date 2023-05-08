import React, { PropsWithChildren } from "react"

const CellWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="border-2 border-neutral-400 w-7 h-7 bg-neutral-200">
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
        <CellWrapper>{value}</CellWrapper>
      </div>
    )
  }
  if (isMarked) {
    return (
      <div onClick={onClick} onContextMenu={onClick}>
        <CellWrapper>F</CellWrapper>
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
