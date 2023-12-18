'use client';

import { IndiciesPlayedTo, MAX_WIDTH, MIN_WIDTH_PERCENTAGE, lastIndex } from './page';
import YouTube, { YouTubeProps } from 'react-youtube';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import { playlists } from './playlists';

// Home component
export const Home = () => {
	// State and useEffect...
	const [moduleIndex, setModuleIndex] = useState(0);
	const [indiciesPlayedTo, setIndiciesPlayedTo] = useState<IndiciesPlayedTo>({});
	const [videoIndex, setVideoIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [moduleName, setModuleName] = useState('');
	const accentColor = 'red'; // Youtube red (pretty sick that it's just pure red)

	useEffect(() => {
		const moduleIndex = Number(getCookie('moduleIndex')) || 0;
		setModuleIndex(moduleIndex);
		setIndiciesPlayedTo(JSON.parse(getCookie('indiciesPlayedTo') || '{}'));
		setModuleName(playlists[moduleIndex].name);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		setModuleName(playlists[moduleIndex].name);
		setCookie('moduleIndex', moduleIndex);
	}, [moduleIndex]);

	// Handle video player ready event
	const handleReady: YouTubeProps['onReady'] = (event) => {
		console.log('ready!');
		const newVideoIndex = indiciesPlayedTo[moduleIndex] || 0;
		// Cue the playlist and update state
		event.target.cuePlaylist(playlists[moduleIndex].id, newVideoIndex, 0);
		setVideoIndex(newVideoIndex);
		setIsLoading(false);
	};

	// Handle video player end event
	const handleEnd: YouTubeProps['onEnd'] = (event) => {
		console.log('ENDED, marking as played');
		// Update indicies and cookies, then move to the next module
		updateIndiciesAndCookies();
		setModuleIndex(moduleIndex + 1);
	};

	// Handle video player play event
	const handlePlay: YouTubeProps['onPlay'] = (event) => {
		// If video index exists, update indicies and cookies
		if (videoIndex) {
			updateIndiciesAndCookies();
		}
		// Update video index and loading state
		setVideoIndex(event.target.getPlaylistIndex());
		setIsLoading(false);
	};

	// Update indicies and cookies
	const updateIndiciesAndCookies = () => {
		const newIndicies = { ...indiciesPlayedTo };
		newIndicies[moduleIndex] = videoIndex;
		// Update state and cookies
		setIndiciesPlayedTo(newIndicies);
		setCookie('indiciesPlayedTo', JSON.stringify(newIndicies));
	};

	// Render component
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-12 lg-px-24'>
			{/* Loading spinner */}
			{isLoading && (
				<>
					<div className='spinner'>
						<div />
					</div>
					<style jsx>{`
						// Spinner styles...
						.spinner {
							--height: 40px;
							margin-top: calc((360 / 2) + 40);
							width: 40px;
							height: var(--height);
							position: absolute;
							border: 1.5px solid rgba(0, 0, 0, 0.2);
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
			)}

			{/* Page title */}
			<h1>Montessori Beginnings</h1>

			{/* YouTube player */}
			<div className='youtube-container'>
				<YouTube
					onStateChange={(event) => {
						// Adjust player width and height
						event.target.g.width = Math.min(
							Math.max(window.innerWidth * MIN_WIDTH_PERCENTAGE, 400),
							MAX_WIDTH
						);
						event.target.g.height = 'auto';
						event.target.g.style.aspectRatio = '16 / 9';
					}}
					onEnd={handleEnd}
					onPlay={handlePlay}
					onReady={handleReady}
					opts={{
						playerVars: {
							listType: 'playlist',
							list: playlists[moduleIndex].id,
						},
					}} />
			</div>

			{/* Module navigation buttons */}
			<div className='mt-8 text-center flex items-center space-x-4 md:space-x-10 md:flex-row px-5'>
				{/* Previous module button */}
				<button
					className='min-w-[2rem]'
					disabled={moduleIndex - 1 < 0}
					onClick={() => setModuleIndex(moduleIndex - 1)}
				>
					<h3 className={`text-xl md:text-3xl`}>
						<span className='inline-block'>&lt;-</span>
					</h3>
				</button>

				{/* Module title */}
				<h2 className='text-xl max-w-[90%] md:text-3xl'>
					Module {moduleIndex + 1}
					{moduleName && `: ${moduleName}`}
				</h2>

				{/* Next module button */}
				<button
					className='min-w-[2rem]'
					disabled={moduleIndex + 1 > lastIndex}
					onClick={() => setModuleIndex(moduleIndex + 1)}
				>
					<h3 className={`text-xl md:text-3xl`}>
						<span className='inline-block'>-&gt;</span>
					</h3>
				</button>
			</div>

			{/* Workbook link */}
			<h3 className='my-2'>
				Video {videoIndex + 1} &nbsp;&nbsp;&mdash;&nbsp;
				<a target='_blank' href={playlists[moduleIndex].workbookURL}>
					↓ Workbook
				</a>
			</h3>

			{/* Handouts section */}
			{playlists[moduleIndex].handouts && (
				<>
					<p>Handouts:</p>
					{playlists[moduleIndex].handouts?.map((handout, index) => (
						<p key={index}>
							<a target='_blank' href={handout.url}>
								↓ &ldquo;{handout.name}&rdquo;
							</a>
						</p>
					))}
				</>
			)}

			{/* CSS Styles for links and other elements */}
			<style jsx>{`
				// Link styles...
				a {
					color: hsl(200, 100%, 50%);
				}
				h1 {
					// Title styles...
					font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
					font-size: 2.4rem;
					padding: 1rem;
					margin-bottom: 2rem;
					border-radius: 0.5rem;
				}
				h2 {
					// Module title styles...
					font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
					letter-spacing: 0.1rem;
					text-transform: uppercase;
					margin-top: 0.4rem;
				}
				button:disabled {
					// Disabled button styles...
					color: black;
				}
				// YouTube player container styles...
				.youtube-container div {
					position: relative;
					padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
					height: 0;
					overflow: hidden;
					max-width: 100%;
					background: #000;
					margin: 1.5em auto;
				}

				.youtube-container div iframe {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border: 0;
				}
			`}</style>
		</main>
	);
};
