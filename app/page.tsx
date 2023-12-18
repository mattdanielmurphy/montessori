'use client'

import { Handout, playlists } from './playlists'
import { SetStateAction, useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { getCookie, setCookie } from 'cookies-next'

import { Spinner } from './Spinner'

interface IndiciesLeftOffOn {
	[index: number]: number
}

// Constants
const MAX_WIDTH = 1280
const MIN_WIDTH_PERCENTAGE = 0.8
const accentColor = 'white'
const lastIndex = playlists.length - 1

// Home component
const Home = () => {
	// State and useEffect...
	const [playerDimensions, setPlayerDimensions] = useState({
		height: '700',
		width: '393.75',
	})
	const [moduleIndex, setModuleIndex] = useState(0)
	const [indiciesLeftOffOn, setIndiciesLeftOffOn] = useState<IndiciesLeftOffOn>(
		{},
	)
	const [videoIndex, setVideoIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [moduleName, setModuleName] = useState('')

	useEffect(() => {
		const moduleIndex = Number(getCookie('moduleIndex')) || 4
		setModuleIndex(moduleIndex)
		setIndiciesLeftOffOn(JSON.parse(getCookie('indiciesLeftOffOn') || '{}'))
		setModuleName(playlists[moduleIndex].name)

		// Listen for keyboard commands
		console.log('lastIndex', lastIndex)
		const listener = (e: KeyboardEvent) => {
			if (e.altKey && e.key === 'ArrowRight') tryToIncrementModuleIndex()
			if (e.altKey && e.key === 'ArrowLeft') tryToDecrementModuleIndex()
		}

		// setYoutubePlayerDimensions(setPlayerDimensions)
		const { width, height } = getDimensionsBasedOnWindowSize()
		const ytplayer = document.querySelector(
			'.youtube-container iframe',
		) as HTMLIFrameElement
		if (ytplayer) {
			ytplayer.width = String(width)
			ytplayer.style.aspectRatio = '16 / 9'
			ytplayer.height = 'auto'
		}
		setPlayerDimensions({
			height: String(height),
			width: String(width),
		})

		document.addEventListener('keydown', listener)
		return () => document.removeEventListener('keydown', listener)
	}, [])

	useEffect(() => {
		setIsLoading(true)
		setModuleName(playlists[moduleIndex].name)
		setCookie('moduleIndex', moduleIndex)
	}, [moduleIndex])

	const tryToIncrementModuleIndex = () => {
		setModuleIndex((moduleIndex) => {
			return moduleIndex + 1 <= lastIndex ? moduleIndex + 1 : moduleIndex
		})
	}

	const tryToDecrementModuleIndex = () => {
		setModuleIndex((moduleIndex) => {
			return moduleIndex - 1 >= 0 ? moduleIndex - 1 : moduleIndex
		})
	}

	// Handle video player ready event... when the player is ready after switching to a new module
	const handleReady: YouTubeProps['onReady'] = (event) => {
		console.log('ready!')
		const newVideoIndex = indiciesLeftOffOn[moduleIndex] || 0
		// Cue the playlist and update state

		event.target.cuePlaylist(playlists[moduleIndex].id, newVideoIndex, 0)
		setVideoIndex(newVideoIndex)

		setIsLoading(false)
	}

	// Handle video player end event
	const handleEnd: YouTubeProps['onEnd'] = (event) => {
		console.log('ENDED, marking as played')
		// Update indicies and cookies, then move to the next module
		tryToIncrementModuleIndex()
	}

	// Handle video player play event
	const handlePlay: YouTubeProps['onPlay'] = (event) => {
		// If video index exists, update indicies and cookies
		// if (videoIndex) {
		// 	updateIndiciesAndCookies()
		// }
		// Update video index and loading state
		setVideoIndex(event.target.getPlaylistIndex())
		setIsLoading(false)
	}

	// Handle video player state change event
	const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
		setYoutubePlayerDimensions(event, setPlayerDimensions)
		updateIndiciesAndCookies()
	}

	// Update indicies and cookies
	const updateIndiciesAndCookies = () => {
		const newIndicies = { ...indiciesLeftOffOn }
		newIndicies[moduleIndex] = videoIndex
		console.log('updating indicies and cookies', newIndicies)
		// Update state and cookies
		setIndiciesLeftOffOn(newIndicies)
		setCookie('indiciesLeftOffOn', JSON.stringify(newIndicies))
	}

	// Render component
	return (
		<main className='flex min-h-screen flex-col items-center justify-center lg-px-24'>
			{/* Loading spinner */}
			{isLoading && <Spinner accentColor={accentColor} />}

			{/* Page title */}
			<h1>Montessori Beginnings</h1>

			{/* YouTube player */}
			<div className='youtube-container'>
				<YouTube
					onStateChange={handleStateChange}
					onEnd={handleEnd}
					onPlay={handlePlay}
					onReady={handleReady}
					style={{ opacity: isLoading ? 0.5 : 1 }}
					opts={{
						...playerDimensions,
						playerVars: {
							listType: 'playlist',
							list: playlists[moduleIndex].id,
						},
					}}
				/>
			</div>

			{/* Module navigation buttons */}
			<div className='mt-8 text-center flex items-center space-x-4 md:space-x-10 md:flex-row px-5'>
				{/* Previous module button */}
				<button
					className='min-w-[2rem] hover:text-[#00d4ff]'
					disabled={moduleIndex - 1 < 0}
					onClick={tryToDecrementModuleIndex}
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
					className='min-w-[2rem] hover:text-[#00d4ff]'
					disabled={moduleIndex + 1 > lastIndex}
					onClick={tryToIncrementModuleIndex}
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
		</main>
	)
}

export default Home

function setYoutubePlayerDimensions(
	event: { data?: number; target: any },
	setPlayerDimensions: {
		(value: SetStateAction<{ height: string; width: string }>): void
	},
) {
	const { width, height } = getDimensionsBasedOnWindowSize()
	event.target.g.width = width
	event.target.g.style.aspectRatio = '16 / 9'
	event.target.g.height = 'auto'
	setPlayerDimensions({
		height: String(height),
		width: String(width),
	})
}

function getDimensionsBasedOnWindowSize() {
	const width = Math.min(
		Math.max(window.innerWidth * MIN_WIDTH_PERCENTAGE, 400),
		MAX_WIDTH,
	)
	return { width, height: width * 0.5625 }
}
