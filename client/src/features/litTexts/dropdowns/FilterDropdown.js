import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function FilterDropdown({ poetryProseValue, handlePoetryProseValue }) {
	return (
		<FormControl sx={{ minWidth: "162px", ml: 5, mt: 1, bgcolor: "#fefcf9" }} >
			<InputLabel id="filter-by-label">View</InputLabel>
			<Select
				labelId="filter-by-label"
				id="filter-by"
				value={poetryProseValue}
				label="View"
				onChange={handlePoetryProseValue}
			>
				<MenuItem value="all">
					All 
				</MenuItem>
				<MenuItem value="poetry">
					Poetry 
				</MenuItem>
				<MenuItem value="prose">
					Prose 
				</MenuItem>
			</Select>
		</FormControl>
	)
}