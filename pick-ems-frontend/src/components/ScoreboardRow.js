

const ScoreboardRow = ({key, pick}) => {
	return (
		<tr key={key} className="border-b border-gray-200 dark:border-gray-700">
			<th scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 ">
				{pick}
			</th>
			<td className="px-6 py-4 text-center">
				O
			</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
				U
			</td>
			<td className="px-6 py-4 text-center">
				O
			</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
				U
			</td>
			<td className="px-6 py-4 text-center">
				O
			</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
				U
			</td>
			<td className="px-6 py-4 text-center">
				O
			</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
				U
			</td>
			<td className="px-6 py-4 text-center">
				O
			</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
				U
			</td>
			<td className="px-6 py-4 text-center">
				O
			</td>
			<td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
				U
			</td>
		</tr>
	);
}

export default ScoreboardRow;