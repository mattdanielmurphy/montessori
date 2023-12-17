import { useState, useEffect } from 'react';

const IFrame = () => {
	const [loading, setLoading] = useState(true)
	const handleLoad = () => setLoading(false)

	return (
		<div>
			{loading && <div className="loading-overlay">Loading...</div>}
			<iframe onLoad={handleLoad} id="myFrame" src="https://example.com" width="600" height="400"></iframe>

			<style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
      `}</style>
		</div>
	);
};

export default IFrame;
