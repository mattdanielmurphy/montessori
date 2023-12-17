"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Playlist {
	id: string
	name: string
}

const playlists: Playlist[] = [
	{ id: "PLGXNehBPAYVYIpRQhT-On1gfD3SzarGLr", name: "Intro" },
	{
		id: "PLGXNehBPAYVYPLT0o9FCs7ruCuFjGBz8y",
		name: "The Prepared Environment",
	},
	{
		id: "PLGXNehBPAYVYvJjtkyTjcAsvk5_Fb2ToA",
		name: "Laura",
	},
]

export default function Home() {
	const [moduleIndex, setModuleIndex] = useState(0)
	const [moduleName, setModuleName] = useState(playlists[moduleIndex].name)

	useEffect(() => {
		setModuleName(playlists[moduleIndex].name)
	}, [moduleIndex])

	const lastIndex = playlists.length-1

	function handleNextButton() {
		if (moduleIndex + 1 <= lastIndex) setModuleIndex(moduleIndex + 1)
	}
	function handlePrevButton() {
		if (moduleIndex - 1 >= 0) setModuleIndex(moduleIndex - 1)
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-between py-12 px-24'>
			<h1>Montessori Beginnings</h1>
			{/* <iframe
        src={`https://mega.nz/embed/${videos[moduleIndex].id}`}
        allowFullScreen
      ></iframe> */}

			<iframe
				src={`https://www.youtube.com/embed/videoseries?list=${playlists[moduleIndex].id}`}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			></iframe>
			<div className='mt-10 text-center flex items-center space-x-10'>
				<button onClick={handlePrevButton} className='group'>
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
				<button onClick={handleNextButton} className='group'>
					<h3 className={`text-3xl`}>
						<span className='inline-block transition-transform group-hover:scale-150 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h3>
				</button>
			</div>
			<style jsx>{`
				h1 {
					font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
					font-size: 2.4rem;
					padding: 1rem;
					margin-bottom: 2rem;
					border-radius: 0.5rem;
				}
				iframe {
					width: 100%;
					aspect-ratio: 16 / 9;
					max-width: 1280px;
				}
				h2 {
					font-family: "Avenir", "Helvetica Neue", Helvetica, Arial, sans-serif;
					letter-spacing: 0.1rem;
					text-transform: uppercase;
					font-size: 1.8rem;
					margin-top: 0.4rem;
				}
			`}</style>
		</main>
	)
}
