"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import { Handout, playlists } from "./playlists"

export default function Home() {
	const [moduleIndex, setModuleIndex] = useState(0)
	const [videoIndex, setVideoIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [indiciesPlayedTo, setIndiciesPlayedTo] = useState<{
		[index: number]: number
	}>({ 0: 1 })
	const [moduleName, setModuleName] = useState(playlists[moduleIndex].name)
	const accentColor = "red" // Youtube red (pretty sick that it's just pure red)

	useEffect(() => {
		setIsLoading(true)
		setModuleName(playlists[moduleIndex].name)
	}, [moduleIndex])

	// const lastIndex = playlists.length - 1
	const lastIndex = 7

	function handlePrevButton() {
		if (moduleIndex - 1 >= 0) setModuleIndex(moduleIndex - 1)
	}
	const onReady: YouTubeProps["onReady"] = (event) => {
		// access to player in all event handlers via event.target
		console.log("ready!")
		console.log("cueing with index:", indiciesPlayedTo[moduleIndex])

		const newVideoIndex = indiciesPlayedTo[moduleIndex] || 0
		event.target.cuePlaylist(playlists[moduleIndex].id, newVideoIndex, 0)
		setVideoIndex(newVideoIndex)
		setIsLoading(false)
	}
	const onEnd: YouTubeProps["onEnd"] = (event) => {
		// fires when playlist ends
		console.log("ENDED, marking as played")
		const newIndicies = indiciesPlayedTo
		newIndicies[moduleIndex] = videoIndex
		setIndiciesPlayedTo(newIndicies)
		// go to next module
		setModuleIndex(moduleIndex + 1)
	}
	const onPlay: YouTubeProps["onPlay"] = (event) => {
		// access to player in all event handlers via event.target
		console.log("event.target", event.target)
		if (videoIndex) {
			const newIndicies = indiciesPlayedTo
			newIndicies[moduleIndex] = videoIndex
			setIndiciesPlayedTo(newIndicies)
		}
		setVideoIndex(event.target.getPlaylistIndex())
		console.log("next video ready")
		setIsLoading(false)
	}
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-12 px-24'>
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
			<YouTube
				onEnd={onEnd} // defaults -> noop
				onPlay={onPlay} // defaults -> noop
				onReady={onReady}
				opts={{
					playerVars: {
						listType: "playlist",
						list: playlists[moduleIndex].id,
					},
				}}
			/>
			<div className='mt-10 text-center flex items-center space-x-10'>
					<button disabled={moduleIndex - 1 < 0} className='prev-button' onClick={() => setModuleIndex(moduleIndex - 1)} >
						<h3 className={`text-3xl`}>
							<span className='inline-block transition-transform group-hover:scale-150 motion-reduce:transform-none'>
								&lt;-
							</span>
						</h3>
					</button>
				<h2>
					Module {moduleIndex + 1}
					{moduleName && `: ${moduleName}`}
				</h2>
					<button disabled={moduleIndex + 1 > lastIndex} className='next-button'
						onClick={() => setModuleIndex(moduleIndex + 1)}
					>
						<h3 className={`text-3xl`}>
							<span className='inline-block transition-transform group-hover:scale-150 motion-reduce:transform-none'>
								-&gt;
							</span>
						</h3>
					</button>

			</div>
			{playlists[moduleIndex].workbookURL && (
				<p>
					<a target='_blank' href={playlists[moduleIndex].workbookURL}>
						↓ Workbook
					</a>
				</p>
			)}
			{playlists[moduleIndex].handouts && (
				<>
					<p>Handouts:</p>
					<p>
						{playlists[moduleIndex].handouts?.map((handout: Handout) => (
							<a target='_blank' href={handout.url}>
								↓ "{handout.name}"
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
					font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
					font-size: 2.4rem;
					padding: 1rem;
					margin-bottom: 2rem;
					border-radius: 0.5rem;
				}
				h2 {
					font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
					letter-spacing: 0.1rem;
					text-transform: uppercase;
					font-size: 1.8rem;
					margin-top: 0.4rem;
				}
				button:disabled {
					color: black;
				}
			`}</style>
		</main>
	)
}
