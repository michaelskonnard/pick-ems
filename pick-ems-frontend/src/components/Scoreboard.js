import ScoreboardRow from "@/components/ScoreboardRow.js";
import {picks, users} from "/src/data/data.js";

const Scoreboard = () => {
	return (
		<div className='flex min-h-screen items-center justify-center min-h-screen bg-gradient-to-br'>
			<div className="flex items-center justify-center min-h-[450px]">
				<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
					<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
						<body className="flex items-center justify-center">
							<div className="container">
								<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
									<table
										className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow:scroll">
										<thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
										<tr>
											<th scope="col" className="px-6 py-3 bg-green-200 dark:bg-gray-800">
												<p className="text-green-500">Pick</p>
											</th>
											{users.map(user =>
												<th key={user.name} scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
													{user.name}
												</th>
											)}
										</tr>
										</thead>
										<tbody>
										{picks.map((pick) =>
										 	<ScoreboardRow key={pick.prop} pick={pick.prop}/>
										)}
										</tbody>
									</table>
								</div>
							</div>
						</body>
					</div>
				</div>

			</div>
		</div>

		// <div className="text-sm text-white font-semibold py-10 text-center -mt-20">
		// 	Made with <a href="https://chat.openai.com/g/g-8gGyAPc6i-material-tailwind-gpt" className="text-white hover:text-gray-800" target="_blank">MT GPT</a> based on <a href="https://www.material-tailwind.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Material Tailwind Framework</a>.
		// </div>
	);
};

export default Scoreboard;