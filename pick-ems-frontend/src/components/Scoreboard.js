import ScoreboardRow from "@/components/ScoreboardRow.js";
import {picks, users} from "/src/data/data.js";

const Scoreboard = () => {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br'>
			<div className="flex items-center justify-center min-h-[450px] w-80 sm:w-full">
				<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
					<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
						<div className="flex items-center justify-center">
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
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default Scoreboard;