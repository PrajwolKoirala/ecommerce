import React from 'react'

export default function ErrorMessage({msg}) {
  return (
    <div>
        <p style = {{
            fontSize : "0.8 rem",
            color : "red"
        }}>
            {msg}
            </p>
    </div>
  )
}


