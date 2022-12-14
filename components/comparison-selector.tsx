import { AnimateSharedLayout, motion } from "framer-motion"
import colors from "tailwindcss/colors"

export enum SelectionMode {
	FRIENDS,
	GAMES,
	STEAMIDS,
}

interface ComparisonSelectorProps {
	mode: SelectionMode
	setMode: (mode: SelectionMode) => void
}

interface SelectionModeArray {
	mode: SelectionMode
	name: string
}

export const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({
	mode,
	setMode,
}) => {
	const modes: SelectionModeArray[] = [
		{ mode: SelectionMode.FRIENDS, name: "Friends" },
		{ mode: SelectionMode.GAMES, name: "Games" },
		// { mode: SelectionMode.STEAMIDS, name: "SteamIDs" },
	]

	return (
		<div className="mx-0 py-4 text-center">
			<h3 className="opacity-75">
				<i>Compare By</i>
			</h3>
			<div className="space-y-4 md:flex md:justify-center md:space-y-0 md:space-x-12">
				<AnimateSharedLayout>
					{modes.map((m) => {
						return (
							<button
								className="relative mx-auto block w-2/3 rounded-none bg-transparent text-center text-lg font-semibold text-black shadow-none hover:bg-transparent focus:ring-0 active:bg-transparent dark:text-white md:mx-0 md:w-36"
								onClick={() => setMode(m.mode)}
								key={m.mode}
							>
								{m.name}
								{mode === m.mode && (
									<motion.div
										initial={false}
										layoutId="underline"
										className="absolute left-0 top-0 h-full w-[3px] bg-violet-400 md:bottom-0 md:top-full md:h-[3px] md:w-full"
									/>
								)}
							</button>
						)
					})}
				</AnimateSharedLayout>
			</div>
		</div>
	)
}
