import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosInterceptor'
import { toast } from 'react-hot-toast'

const initialState = {
	formData: [],
	loading: false,
	error: null,
	countId: 0,
}

// export const getFormdata = createAsyncThunk('formData/get', async () => {
// 	try {
// 		const response = await axios.get(
// 			'https://dummyapi.io/data/v1/user?limit=50'
// 		)
// 		return response.data
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

const formDataSlice = createSlice({
	name: 'formData',
	initialState,
	reducers: {
		addData(state, action) {
			state.countId++
			action.payload.id = state.countId
			state.formData = [...state.formData, action.payload]
			toast.success('Successfully submited')
		},
		updateData(state, action) {
			console.log(action)
			let index = state.formData.findIndex(
				(data) => data?.id === action.payload.id
			)
			state.formData.splice(index, 1, action.payload)
			toast.success('Successfully submited')
		},
		deleteData(state, action) {
			state.formData = state.formData?.filter(
				(data) => data.id !== action.payload?.id
			)
			toast.success('Successfully deleted')
			return state
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getFormdata.pending, (state) => {
	// 			state.loading = true
	// 			state.error = null
	// 		})
	// 		.addCase(getFormdata.fulfilled, (state, action) => {
	// 			state.loading = false
	// 			state.formData = action.payload
	// 		})
	// 		.addCase(getFormdata.rejected, (state, action) => {
	// 			state.loading = false
	// 			state.error = action.error.message
	// 		})
	// 		.addCase(addFormData.pending, (state) => {
	// 			state.loading = true
	// 			state.error = null
	// 		})
	// 		.addCase(addFormData.fulfilled, (state, action) => {
	// 			state.loading = false
	// 			state.formData = action.payload
	// 		})
	// 		.addCase(addFormData.rejected, (state, action) => {
	// 			state.loading = false
	// 			state.error = action.error.message
	// 		})
	// 		.addCase(updateFormData.pending, (state) => {
	// 			state.loading = true
	// 			state.error = null
	// 		})
	// 		.addCase(updateFormData.fulfilled, (state, action) => {
	// 			state.loading = false
	// 			state.formData = action.payload
	// 		})
	// 		.addCase(updateFormData.rejected, (state, action) => {
	// 			state.loading = false
	// 			state.error = action.error.message
	// 		})
	// 		.addCase(deleteFormData.pending, (state) => {
	// 			state.loading = true
	// 			state.error = null
	// 		})
	// 		.addCase(deleteFormData.fulfilled, (state, action) => {
	// 			const newFormData = { ...state.formData }
	// 			delete newFormData[action.payload]

	// 			state.loading = false
	// 			state.formData = newFormData
	// 		})
	// 		.addCase(deleteFormData.rejected, (state, action) => {
	// 			state.loading = false
	// 			state.error = action.error.message
	// 		})
	// },
})

export const { addData, updateData, deleteData } = formDataSlice.actions

export default formDataSlice.reducer
