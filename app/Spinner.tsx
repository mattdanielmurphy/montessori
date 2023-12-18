'use client'
export const Spinner = ({ accentColor }: { accentColor: any }) => (
	<>
		<div className='spinner'>
			<div />
		</div>
		<style jsx>{`
			// Spinner styles...
			.spinner {
				--height: 40px;
				width: 40px;
				height: var(--height);
				position: absolute;
				top: calc(50vh - 30px);
				border: 0.5px solid rgba(255, 255, 255, 0.2);
				border-radius: 50%;
				border-top: 4px solid ${accentColor};
				animation: spin 0.5s linear infinite;
				margin-bottom: 10px;
				z-index: 999;
			}

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		`}</style>
	</>
)
