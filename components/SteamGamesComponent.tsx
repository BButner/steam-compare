import { XMarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { useAtom } from "jotai"
import Image from "next/image"
import { useState } from "react"

import { ISteamGame } from "../lib/models/steamGame"
import { selectedSteamGamesAtom } from "../lib/store"
import { LoadingBarComponent } from "./LoadingBarComponent"

interface SteamGamesComponentProps {
	games?: ISteamGame[]
	readonly?: boolean
	className?: string
	isCompareMaster?: boolean
	loaded: boolean
}

export const SteamGamesComponent: React.FC<SteamGamesComponentProps> = ({
	games,
	readonly,
	className,
	isCompareMaster,
	loaded,
}) => {
	const [filter, setFilter] = useState<string>("")
	const [selectedGames, setSelectedGames] = useAtom(selectedSteamGamesAtom)

	const selectGame = (game: ISteamGame) => {
		if (selectedGames.includes(game)) {
			setSelectedGames((prev) => prev.filter((f) => f !== game))
		} else {
			setSelectedGames((prev) => prev.concat(game))
		}
	}

	return (
		<div className={className}>
			{!isCompareMaster && <h2>{readonly ? "Games in Common" : "Compare by Game"}</h2>}
			{isCompareMaster && (
				<div className="flex items-center">
					<h2>Comparing by Game</h2>
					<button
						onClick={() => setSelectedGames([])}
						className="mt-6 ml-2 flex h-8 w-8 items-center justify-center rounded bg-red-400 p-0 outline-none duration-200 hover:bg-red-500 focus:ring-4 focus:ring-red-400/50 active:bg-red-700"
					>
						<XMarkIcon className="h-6 w-6 text-white" />
					</button>
				</div>
			)}
			<div className="flex flex-wrap">
				<input
					type="text"
					placeholder="Search Games..."
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="mb-4 block w-full rounded-md py-2 px-4"
				/>
				{!loaded && <LoadingBarComponent className="m-auto mt-12 w-3/4" />}
				{loaded &&
					games &&
					games
						.filter((game) => game.name.toLowerCase().includes(filter.toLowerCase()))
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((game) => {
							return (
								<div className="w-1/2 p-2" key={game.appid}>
									<button
										onClick={() => selectGame(game)}
										disabled={readonly}
										className={clsx(
											"block w-full bg-transparent p-0 text-left text-black hover:text-white active:text-white dark:text-white",
											"shadow-ld flex justify-start overflow-hidden rounded duration-200",
											readonly
												? "hover:bg-white hover:text-black active:bg-white dark:hover:bg-gray-800 hover:dark:text-white active:dark:bg-gray-800"
												: "hover:cursor-pointer hover:bg-violet-400 hover:text-white",
											selectedGames.includes(game)
												? "bg-violet-400 text-white"
												: "bg-white dark:bg-gray-800",
										)}
									>
										<img
											alt={`Game logo for ${game.name}`}
											width={32}
											height={32}
											style={{
												maxWidth: "32px",
												maxHeight: "32px",
											}}
											src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
											className="m-0 overflow-hidden"
										/>
										<p className="m-0 overflow-hidden overflow-ellipsis whitespace-nowrap px-2 font-semibold">
											{game.name}
										</p>
									</button>
								</div>
							)
						})}
			</div>
		</div>
	)
}
