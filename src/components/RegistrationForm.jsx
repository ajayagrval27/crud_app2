import React, { useEffect, useState } from 'react'
// import { getFormdata } from '../redux/reducers/formDataSlice'
import {
	addData,
	updateData,
	deleteData,
} from '../redux/reducers/formDataSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap'

const radioOptions = [
	{ value: 'male', label: 'Male', name: 'gender' },
	{ value: 'female', label: 'Female', name: 'gender' },
	{ value: 'other', label: 'Other', name: 'gender' },
]

const checkboxOptions = [
	{ value: 'reading', label: 'Reading', name: 'hobbies' },
	{ value: 'gaming', label: 'Gaming', name: 'hobbies' },
	{ value: 'playing', label: 'Playing', name: 'hobbies' },
	{ value: 'coding', label: 'Coding', name: 'hobbies' },
]

const statesOptions = [
	{ value: 'CA', label: 'California', name: 'state' },
	{ value: 'NY', label: 'New York', name: 'state' },
	{ value: 'TX', label: 'Texas', name: 'state' },
]

const initialValue = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	gender: '',
	hobbies: [],
	state: '',
	information: '',
}

const checkAlphabet = /^[a-z A-Z]+$/
const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const validationJSONArray = [
	{
		name: 'firstName',
		conditions: [
			{
				condition:
					"formDataObj.firstName == undefined || formDataObj.firstName == '' ",
				error: 'First Name is required',
			},
			{
				condition: '!checkAlphabet.test(formDataObj.firstName)',
				error: 'First Name is only alphabets',
			},
		],
	},
	{
		name: 'lastName',
		conditions: [
			{
				condition:
					"formDataObj.lastName == undefined || formDataObj.lastName == '' ",
				error: 'Last name is required',
			},
			{
				condition: '!checkAlphabet.test(formDataObj.lastName)',
				error: 'Last name is only alphabets',
			},
		],
	},
	{
		name: 'email',
		conditions: [
			{
				condition:
					"formDataObj.email === undefined || formDataObj.email === ''",
				error: 'Email is required',
			},
			{
				condition: '!emailValidation.test(formDataObj.email)',
				error: 'Invalid Email format',
			},
		],
	},
	{
		name: 'password',
		conditions: [
			{
				condition:
					"formDataObj.password === undefined || formDataObj.password === ''",
				error: 'Password is required',
			},
			{
				condition: 'formDataObj.password.length <= 7',
				error: 'Password does not meet requirements',
			},
		],
	},
	{
		name: 'gender',
		conditions: [
			{
				condition:
					"formDataObj.gender == 'undefined' || formDataObj.gender == ''",
				error: 'Gender is required',
			},
		],
	},
	{
		name: 'hobbies',
		conditions: [
			{
				condition:
					"formDataObj.hobbies == 'undefined' || formDataObj.hobbies == ''",
				error: 'Hobbies is required',
			},
			{
				condition: 'formDataObj.hobbies.length < 2',
				error: 'Hobbies should be more than 2',
			},
		],
	},
	{
		name: 'state',
		conditions: [
			{
				condition:
					"formDataObj.state == 'undefined' || formDataObj.state == '' || formDataObj.state == '--Select State--'",
				error: 'state is required',
			},
		],
	},
	{
		name: 'information',
		conditions: [
			{
				condition:
					"formDataObj.information == 'undefined' || formDataObj.information == ''",
				error: 'information is required',
			},
		],
	},
]

const RegistrationForm = () => {
	const dispatch = useDispatch()
	const {
		loading,
		error,
		formData: stateFormData,
	} = useSelector((state) => state.formData)
	const [formDataObj, setFormDataObj] = useState(initialValue)
	const [blankObj, setSetBlankObj] = useState(initialValue)
	let [errorObj, setErrorObj] = useState({})

	console.log(stateFormData)

	const handleChange = (e) => {
		if (e.target.type == 'checkbox') {
			formDataObj[e.target.name] = formDataObj[e.target.name] ?? []
			blankObj[e.target.name] = []
			if (e.target.checked) {
				formDataObj[e.target.name] = [
					...formDataObj[e.target.name],
					e.target.value,
				]
			} else {
				formDataObj[e.target.name] = formDataObj[e.target.name]?.filter(
					(x) => x !== e.target.value
				)
			}
		} else {
			formDataObj[e.target.name] = e.target.value
			blankObj[e.target.name] = ''
		}
		setFormDataObj({ ...formDataObj })
		setSetBlankObj({ ...blankObj })
		validationForm(e.target.name)
	}

	const validationForm = (name) => {
		let validationObj = validationJSONArray?.find((x) => x.name === name)
		let validObj = validationObj?.conditions?.find((x) => eval(x.condition))
		if (validObj) {
			errorObj[name] = validObj.error
		} else {
			delete errorObj[name]
		}
		setErrorObj({ ...errorObj })
	}

	const handleSubmit = () => {
		Object.keys(formDataObj).forEach((x) => {
			validationForm(x)
		})
		if (Object.keys(errorObj).length === 0) {
			if (formDataObj?.id !== undefined) {
				dispatch(updateData(formDataObj))
			} else {
				dispatch(addData(formDataObj))
			}
			setFormDataObj({ ...blankObj })
		}
	}

	const handleEdit = (id, obj) => {
		setFormDataObj({ ...obj })
	}

	const handleDelete = (id) => {
		dispatch(deleteData({ id: id }))
	}

	return (
		<>
			<div className="container mx-auto">
				<Form
					style={{
						width: '36rem',
						borderRadius: '2rem',
						boxShadow: '0px 10px 14px 4px rgba(0,0,0,0.1)',
					}}
					className="mx-auto p-4 m-3"
				>
					<h1 className="text-center">Registration Form</h1>
					<Form.Group className="mb-3">
						<Form.Label>First Name</Form.Label>
						<Form.Control
							className={`rounded-4 ${
								errorObj?.firstName ? 'is-invalid' : ''
							}`}
							type="text"
							name="firstName"
							value={formDataObj.firstName || ''}
							onChange={handleChange}
							placeholder="Enter First Name"
							isInvalid={!!errorObj.firstName}
						/>
						{errorObj.firstName && (
							<p className="ms-2 mb-1 invalid-feedback">
								{errorObj.firstName}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							className={`rounded-4 ${
								errorObj?.lastName ? 'is-invalid' : ''
							}`}
							type="text"
							name="lastName"
							value={formDataObj.lastName || ''}
							onChange={handleChange}
							placeholder="Enter Last Name"
							isInvalid={!!errorObj.lastName}
						/>
						{errorObj.lastName && (
							<p className="ms-2 mb-1 invalid-feedback">
								{errorObj.lastName}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							className={`rounded-4 ${
								errorObj?.email ? 'is-invalid' : ''
							}`}
							type="email"
							name="email"
							value={formDataObj.email || ''}
							onChange={handleChange}
							placeholder="Enter Email"
							isInvalid={!!errorObj.lastName}
						/>
						{errorObj.email && (
							<p className="ms-2 mb-1 invalid-feedback">
								{errorObj.email}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							className={`rounded-4 ${
								errorObj?.password ? 'is-invalid' : ''
							}`}
							type="password"
							name="password"
							value={formDataObj.password || ''}
							onChange={handleChange}
							placeholder="Enter Password"
							isInvalid={!!errorObj.password}
						/>
						{errorObj.password && (
							<p className="ms-2 mb-1 invalid-feedback">
								{errorObj.password}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Gender</Form.Label>
						<div className="d-flex">
							{radioOptions &&
								radioOptions?.map((option) => (
									<Form.Check
										className={`me-4 rounded-4 ${
											errorObj?.gender ? 'is-invalid' : ''
										}`}
										key={option.value}
										type="radio"
										id={option.value}
										label={option.label}
										name={option.name}
										checked={
											formDataObj.gender === option.value
										}
										onChange={handleChange}
										isInvalid={!!errorObj.gender}
										{...option}
									/>
								))}
						</div>
						{errorObj.gender && (
							<div
								style={{ fontSize: '0.875rem' }}
								className="ms-2 mb-1 mt-1 text-danger"
							>
								{errorObj.gender}
							</div>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Hobbies</Form.Label>
						<div className="d-flex">
							{checkboxOptions &&
								checkboxOptions?.map((option) => (
									<Form.Check
										className={`me-4 rounded-4 ${
											errorObj?.hobbies
												? 'is-invalid'
												: ''
										}`}
										key={option.value}
										type="checkbox"
										id={option.value}
										label={option.label}
										name={option.name}
										checked={
											formDataObj?.hobbies?.includes(
												option.value
											) === true
										}
										onChange={handleChange}
										isInvalid={!!errorObj.hobbies}
										{...option}
									/>
								))}
						</div>
						{errorObj.hobbies && (
							<div
								style={{ fontSize: '0.875rem' }}
								className="ms-2 mb-1 mt-1 text-danger"
							>
								{errorObj.hobbies}
							</div>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Select State:</Form.Label>
						<Form.Select
							className={`me-4 rounded-4 ${
								errorObj?.state ? 'is-invalid' : ''
							}`}
							name="state"
							onChange={handleChange}
							defaultValue={formDataObj?.state || ''}
							isInvalid={!!errorObj.state}
						>
							<option>--Select State--</option>
							{statesOptions &&
								statesOptions.map((state) => (
									<option
										key={state.value}
										value={state.value}
										id={state.value}
										defaultValue={formDataObj?.state || ''}
									>
										{state.label}
									</option>
								))}
						</Form.Select>
						{errorObj.state && (
							<p className="ms-2 mb-1 invalid-feedback">
								{errorObj.state}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Information</Form.Label>
						<Form.Control
							className={`me-4 rounded-4 ${
								errorObj?.information ? 'is-invalid' : ''
							}`}
							as="textarea"
							rows={3}
							name="information"
							value={formDataObj.information || ''}
							onChange={handleChange}
							placeholder="Enter information"
							isInvalid={!!errorObj.information}
						/>
						{errorObj.information && (
							<p className="ms-2 mb-1 invalid-feedback">
								{errorObj.information}
							</p>
						)}
					</Form.Group>
					<div>
						<Button
							className="rounded-4 btn btn-primary px-4"
							type="button"
							variant="primary"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</div>
				</Form>
			</div>

			{stateFormData && stateFormData.length > 0 && (
				<Row xs={1} md={2} lg={4} className="mx-auto px-4">
					{stateFormData.map((data, i) => (
						<Col key={i}>
							<Card
								className="p-1 rounded-4 m-2 shadow cards"
								style={{ width: '18rem' }}
							>
								<Card.Header className="rounded-4 fs-6 text-white fw-semibold">
									USER DATA
								</Card.Header>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<span className="fw-semibold">
											Full Name:
										</span>
										{` ${data?.firstName} ${data?.lastName}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Email:
										</span>
										{` ${data?.email}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Gender:
										</span>
										{` ${data?.gender}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Hobbies:
										</span>
										{` ${data?.hobbies?.join(', ')}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											State:
										</span>
										{` ${data?.state}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Information:
										</span>
										{` ${data?.information}`}
									</ListGroup.Item>
									<ListGroup.Item className="d-flex justify-content-around">
										<Button
											className="btn btn-info"
											onClick={() =>
												handleEdit(data?.id, data)
											}
										>
											Edit
										</Button>
										<Button
											className="btn btn-danger"
											onClick={() =>
												handleDelete(data?.id)
											}
										>
											Delete
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					))}
				</Row>
			)}

			{/* {stateFormData &&
					stateFormData?.map((data, i) => {
						return (
							<Card
								className="p-1 rounded-4 m-2"
								key={i}
								style={{ width: '18rem' }}
							>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<span className="fw-semibold">
											Full Name :
										</span>
										{` ${data?.firstName} ${data?.lastName}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Email :
										</span>
										{` ${data?.email}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Gender :
										</span>
										{` ${data?.gender}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Hobbies :
										</span>
										{` ${data?.hobbies.join(', ')}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											State :
										</span>
										{` ${data?.state}`}
									</ListGroup.Item>
									<ListGroup.Item>
										<span className="fw-semibold">
											Information :
										</span>
										{` ${data?.information}`}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						)
					})} */}
		</>
	)
}

export default RegistrationForm
