import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
	"users/fetchAllUsers", 
	async () => {
		const response = await fetch("/users")
		const data = await response.json()
		console.log("fetchAllUsers:", data)
    return data
	}
)

const initialState = {
	entities: [],
	user: {},
	status: "idle",
	errors: null
}

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllUsers.pending, (state) => {
				state.status = "loading"
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.entities = action.payload
				state.status = "idle"
			})
	},
})

export const { setUser } = usersSlice.actions
export default usersSlice.reducer
