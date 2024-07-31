/* eslint-disable react/prop-types */
import './errorcomponent.css'

export default function ErrorComponent({ error, resetErrorBoundary }) {

    return (
        <div className='container-err-outside'>
            <div className="container-err">
                <p className="message-err">{error.message}</p>
                <button onClick={resetErrorBoundary}>Try Again</button>
            </div>
        </div>
    )
}
