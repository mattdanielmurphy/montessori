import { NextApiRequest, NextApiResponse } from "next"

let playlists: { [index: string]: number } = {} // This will be our simple in-memory store

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	if (typeof id !== "string") return

	switch (req.method) {
		case "GET":
			// Return the video index of the requested playlist
			res.status(200).json({ videoIndex: playlists[id] })
			break
		case "POST":
			// Parse the incoming data
			const { videoIndex } = req.body

			// Update the video index of the specified playlist
			playlists[id] = videoIndex

			// Return the new index
			res.status(200).json({ id, videoIndex })
			break
		default:
			res.setHeader("Allow", ["GET", "POST"])
			res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
