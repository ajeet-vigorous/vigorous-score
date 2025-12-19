function HtmlModal({matchScoreDetails,handleOverlayClick,handleClose}) {
    return (
        <div>
              <div
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    color:"black !important",
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}
                onClick={handleOverlayClick}
            >
                <div
                    style={{
                        width: '700px',
                        maxWidth: '90%',
                        color:"black !important",
                        height: '500px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        overflow: 'auto',
                        padding: '20px',
                        boxSizing: 'border-box',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        position: 'relative', // Needed for the close button
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#333',
                        }}
                    >
                        &times; {/* Close button (X) */}
                    </button>
                    <div className="gx-text-dark" dangerouslySetInnerHTML={{ __html: matchScoreDetails?.score?.session }} />
                </div>
            </div>
        </div>
    )
}

export default HtmlModal
