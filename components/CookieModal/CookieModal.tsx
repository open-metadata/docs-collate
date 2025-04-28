import { useEffect } from 'react'
import Link from 'next/link'

const CookieModal = ({ handleButtonClick }: { handleButtonClick: (choice: string) => void }) => {
    const handleModalClose = (choice: string) => {
        const modalElement = document.querySelector('.cookie-modal')
        if (modalElement) {
            modalElement.classList.remove('visible')
            setTimeout(() => handleButtonClick(choice), 1200)
        }
    }

    useEffect(() => {
        const modalElement = document.querySelector('.cookie-modal')
        const timer = setTimeout(() => {
            if (modalElement) {
                modalElement.classList.add('visible')
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="cookie-card cookie-modal">
            <p className="cookie-content">
                We use cookies to improve site navigation, analyze site usage,
                and enhance your user experience. Click &quot;Accept&quot; to enable
                cookies or &quot;Reject&quot; to reject cookies. To learn more, read our{' '}
                <Link href="https://www.getcollate.io/privacypolicy" target="_blank">
                    <span className="privacy-policy-link">
                        Privacy Policy
                    </span>
                </Link>
                .
            </p>
            <div className="button-group">
                <button
                    className="button button-accept"
                    onClick={() => handleModalClose('Accept')}
                >
                    Accept
                </button>
                <button
                    className="button button-reject"
                    onClick={() => handleModalClose('Decline')}
                >
                    Reject
                </button>
            </div>
        </div>
    )
}

export default CookieModal