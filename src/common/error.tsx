import React from 'react'

interface ErrorStateProps {
  refetch: () => void
}

function ErrorState({ refetch }: ErrorStateProps) {
  return (
    <div className="page_error">

   
      <div className="error_particles"></div>

      <div className="error_content">
        <h2>⚠ Server Error</h2>

        <p>
          Unable to load data.
          Please try again.
        </p>

        <button
          className="refresh_btn"
          onClick={refetch}
        >
          Refresh Page
        </button>
      </div>

    </div>
  )
}

export default ErrorState