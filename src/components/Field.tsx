import React from "react"

interface FieldProps {
  field: number[][]
}

const Field: React.FC<FieldProps> = ({ field }) => (
  <div>
    {field.map((row) => (
      <div className="flex gap-4">
        {row.map((cell) => (
          <div>{cell}</div>
        ))}
      </div>
    ))}
  </div>
)

export default Field
