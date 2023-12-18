'use client'

import { Handout, playlists } from './playlists'
import YouTube, { YouTubeProps } from 'react-youtube'
import { getCookie, setCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

interface IndiciesPlayedTo {
	[index: number]: number
}

export default function Home() {
	const [moduleIndex, setModuleIndex] = useState(0)
	const [indiciesPlayedTo, setIndiciesPlayedTo] = useState<IndiciesPlayedTo>(
		{},
	)
	const [videoIndex, setVideoIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [moduleName, setModuleName] = useState('')
	const accentColor = 'red' // Youtube red (pretty sick that it's just pure red)


	useEffect(() => {
		const moduleIndex = Number(getCookie('moduleIndex')) || 0
		setModuleIndex(moduleIndex)
		setIndiciesPlayedTo(JSON.parse(
			getCookie('indiciesPlayedTo') || '{}',
		))
		setModuleName(playlists[moduleIndex].name)
	}, [])

	useEffect(() => {
		setIsLoading(true)
		setModuleName(playlists[moduleIndex].name)
		setCookie('moduleIndex', moduleIndex)
	}, [moduleIndex])

	// const lastIndex = playlists.length - 1
	const lastIndex = 11

	const onReady: YouTubeProps['onReady'] = (event) => {
		// access to player in all event handlers via event.target
		console.log('ready!')
		console.log('cueing with index:', indiciesPlayedTo[moduleIndex])

		const newVideoIndex = indiciesPlayedTo[moduleIndex] || 0
		event.target.cuePlaylist(playlists[moduleIndex].id, newVideoIndex, 0)
		setVideoIndex(newVideoIndex)
		setIsLoading(false)
	}
	const onEnd: YouTubeProps['onEnd'] = (event) => {
		// fires when playlist ends
		console.log('ENDED, marking as played')
		const newIndicies = indiciesPlayedTo
		newIndicies[moduleIndex] = videoIndex
		setIndiciesPlayedTo(newIndicies)
		setCookie('indiciesPlayedTo', JSON.stringify(indiciesPlayedTo))
		// go to next module
		setModuleIndex(moduleIndex + 1)
	}
	const onPlay: YouTubeProps['onPlay'] = (event) => {
		// access to player in all event handlers via event.target
		console.log('event.target', event.target)
		if (videoIndex) {
			const newIndicies = indiciesPlayedTo
			newIndicies[moduleIndex] = videoIndex
			setIndiciesPlayedTo(newIndicies)
			setCookie('indiciesPlayedTo', JSON.stringify(indiciesPlayedTo))
		}
		setVideoIndex(event.target.getPlaylistIndex())
		console.log('next video ready')
		setIsLoading(false)
	}
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-12 lg-px-24'>
			{isLoading && (
				<div className='spinner'>
					<div />
				</div>
			)}
			<style jsx>{`
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

			<h1>Montessori Beginnings</h1>

			<div className="youtube-container">
				<YouTube
					onStateChange={(event) => {event.target.g.width = Math.min(Math.max(window.innerWidth*.8, 400), 1280), event.target.g.height = 'auto', event.target.g.style.aspectRatio = '16 / 9'}}
					onEnd={onEnd} // defaults -> noop
					onPlay={onPlay} // defaults -> noop
					onReady={onReady}
					opts={{
						playerVars: {
							listType: 'playlist',
							list: playlists[moduleIndex].id,
						},
					}}
				/>
			</div>
			<div className='mt-8 text-center flex items-center space-x-4 md:space-x-10 md:flex-row'>
				<button
				className='min-w-[2rem]'
					disabled={moduleIndex - 1 < 0}
					onClick={() => setModuleIndex(moduleIndex - 1)}
				>
					<h3 className={`text-xl md:text-3xl`}>
						<span className='inline-block'>
							&lt;-
						</span>
					</h3>
				</button>
				<h2 className='text-xl md:text-3xl'>
					Module {moduleIndex + 1}
					{moduleName && `: ${moduleName}`}
				</h2>
				<button
				className='min-w-[2rem]'
					disabled={moduleIndex + 1 > lastIndex}
					onClick={() => setModuleIndex(moduleIndex + 1)}
				>
					<h3 className={`text-xl md:text-3xl`}>
						<span className='inline-block'>
							-&gt;
						</span>
					</h3>
				</button>
			</div>
			<h3 className='my-2'>
				Video {videoIndex + 1} &nbsp;&nbsp;&mdash;&nbsp;{' '}
				<a target='_blank' href={playlists[moduleIndex].workbookURL}>
					↓ Workbook
				</a>
			</h3>
			{playlists[moduleIndex].handouts && (
				<>
					<p>Handouts:</p>
					<p>
						{playlists[moduleIndex].handouts?.map((handout: Handout, index) => (
							<a target='_blank' href={handout.url} key={index}>
								↓ &ldquo;{handout.name}&rdquo;
							</a>
						))}
					</p>
				</>
			)}
			<style jsx>{`
				a {
					color: hsl(200, 100%, 50%);
				}
				h1 {
					font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
					font-size: 2.4rem;
					padding: 1rem;
					margin-bottom: 2rem;
					border-radius: 0.5rem;
				}
				h2 {
					font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
					letter-spacing: 0.1rem;
					text-transform: uppercase;
					margin-top: 0.4rem;
				}
				button:disabled {
					color: black;
				}
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
	)
}
