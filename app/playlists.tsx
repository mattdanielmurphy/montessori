"use client"
export interface Handout { url: string; name: string }

interface Playlist {
	id: string
	name: string
	workbookURL: string
	handouts?: Handout[]
}

export const playlists: Playlist[] = [
	{
		id: "PLGXNehBPAYVYIpRQhT-On1gfD3SzarGLr",
		name: "Intro",
		workbookURL:
			"https://mega.nz/file/lpUEzRha#twnFFTCAwr9G5CypycSJ06yFJXMSGVEkAqugK6ORkWI",
	},
	{
		id: "PLGXNehBPAYVYPLT0o9FCs7ruCuFjGBz8y",
		name: "The Prepared Environment",
		workbookURL:
			"https://mega.nz/file/g1UBiJbI#mgKsaTBI4GZGWL1A8yxwv1PNjJBY1Zg_naakjQIYxMM",
	},
	{
		id: "PLGXNehBPAYVYvJjtkyTjcAsvk5_Fb2ToA",
		name: "Preparing Ourselves as Adults",
		workbookURL:
			"https://mega.nz/file/F512kZZT#tqlwzZXYpBcNJwBaqUOAlZjg9hAVAZXp6MNupOWsdfE",
	},
	{
		id: "PLGXNehBPAYVY5dILxTbsXxxaXCz_e5d6X",
		name: "Observation",
		workbookURL:
			"https://mega.nz/file/w01REKrB#PYpNqWDJpzdV-NUw7DB1H1GjZvOu3RgUenk26jCOERg",
	},
	{
		id: "PLGXNehBPAYVY0CZx7X8rC2vQSZHLoR3vy",
		name: "Social-Emotional Development",
		workbookURL:
			"https://mega.nz/file/d01mEYzZ#7Q3Q4sBJD_Q21gVd2WrUi1wTUOPeIDF_KsvPlbsCRhw",
			handouts: [
				{
					name: "Meltdowns Brain Relationship",
					url: "https://mega.nz/file/U4Nh0K4R#dfsCxw2Hcuo8rR72aSI_vPM803GNPiu9HFaTO1XYU6w",
				},
				{
					name: "Socioemotional Development Stages",
					url: "https://mega.nz/file/Jt9m1RqA#OqGevOV1kG2mZIYqfCOBbLEdRUNBtwvETvguMLKRHYo",
				},
			],
	},
	{
		id: "PLGXNehBPAYVZonih5k4MuMtOGWh8FN018",
		name: "Positive Discipline",
		workbookURL:
			"https://mega.nz/file/FsNWUbKI#eZhk4bo9BEyzq8m57E38za_mIHNGvuE4-PjoaE3Rr0Y",
		handouts: [
			{
				name: "Child's BBB",
				url: "https://mega.nz/file/w8MwmJ5b#Am_trZS_t5K-JyZ0SEwyfduznaW7oi6-LYJspXaCHKc",
			},
		],
	}, // week 6
	{
		id: "PLGXNehBPAYVagjhehL5ATqYz0ulOzk528",
		name: "Movement",
		workbookURL:
			"https://mega.nz/file/N8NBxBwA#tRm9p2HGY2ScZnD-JK6Rs_0bFil8hWbvIJhZJVT5b8w",
	}, // week 7
	{
		id: "PLGXNehBPAYVZgRgoLrTtKRFBHsAl1rIVl",
		name: "Practical Life Activities",
		workbookURL:
			"https://mega.nz/file/RgElQDAa#mWOkBVKX4EOIOZC3rQFnLUJ78GYLUNyUR2uNCZMummE",
	}, // week 8
	{
		id: "",
		name: "Language Development",
		workbookURL:
			"https://mega.nz/file/Bp0jCZCA#r2UoS-pwn9e5rAbd3sc3d5Kdk7UHZPY8kazkmfgOqtY",
	}, // week 9
	{
		id: "",
		name: "Sensorial Activities",
		workbookURL:
			"https://mega.nz/file/o0kn0Q6A#qnPqSJP08DgfRoeVO6qLdYvN8RRJuLE2CaRNygo20wQ",
	}, // week 10
	{
		id: "",
		name: "Covering Basic Needs",
		workbookURL:
			"https://mega.nz/file/FsFT3IRB#E8P2CKi6bad78w9mZIEiB6TzKFHFZ-bYptvRMC1fGSc",
	}, // week 11
	{
		id: "",
		name: "Toilet Learning",
		workbookURL:
			"https://mega.nz/file/ttcGEKBb#2d1jEi7Gfi_7qkwlJfdC3toFFnoljPHDpJZzfWY23k0",
	}, // week 12
	{ id: "", name: "Bonus", workbookURL: "" },
]
