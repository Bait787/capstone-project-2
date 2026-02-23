import NavBar from "../routes/NavBar.jsx";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/esm/FormGroup.js";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEventID } from "./EventIDContext.jsx";
import { registerCheck } from "./RegisterContext";

//date/time calender picker found here https://www.npmjs.com/package/react-datetime-picker?activeTab=readme
//it just looks alot nicer than 2 fields of "choose a day and time" , also saves on validation of checking if its a real date/time
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function EventEditor() {
	const { eventIDRef, incrementEventID } = useEventID(); //context constant ref, lets me keep count between pages
	const { user } = registerCheck();

	//Formik Validation, Checks certian fields have information
	const validate = (values) => {
		const errors = {};
		if (!values.eventDetails) {
			errors.eventDetails = "Required";
		}

		if (!values.eventName) {
			errors.eventName = "Required";
		}
		if (!values.eventLocation) {
			errors.eventLocation = "Required";
		}
		if (!values.inputValue) {
			errors.inputValue = "Required";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			eventName: "",
			eventDetails: "",
			eventLocation: "",
			inputValue: "",
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2)); //I kept the alert in just so its nice to see the values beign updated

			//added the current users email to the array as an identifier of which cards to render on the dash
			const eventArray = [
				values.inputValue,
				values.eventName,
				values.eventDetails,
				values.eventLocation,
				user.email,
			];

			sessionStorage.setItem(
				`event_${eventIDRef.current}`,
				JSON.stringify(eventArray),
			);
			formik.resetForm(); //clears input
			incrementEventID(); //adds 1 to the counter through the context ref
		},
	});

	return (
		<>
			{/*event adder */}
			<Form onSubmit={formik.handleSubmit} className="col-md-4 container">
				<Form.Group>
					<label htmlFor="eventName">
						Event Name<span className="error">*</span>
					</label>
					<Form.Control
						id="eventName"
						name="eventName"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.eventName}
					/>
					{formik.touched.eventName && formik.errors.eventName ? (
						<div className="error">{formik.errors.eventName}</div>
					) : null}
				</Form.Group>
				{/*If there is an error, displays it here, else null 
				"touched" allows the error to only show if the user has clicked on that specific box*/}
				<Form.Group>
					<label htmlFor="eventDetails">
						Event Description<span className="error">*</span>
					</label>
					<Form.Control
						id="eventDetails"
						name="eventDetails"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.eventDetails}
					/>
					{formik.touched.eventDetails && formik.errors.eventDetails ? (
						<div className="error">{formik.errors.eventDetails}</div>
					) : null}
				</Form.Group>
				<Form.Group>
					<label htmlFor="eventLocation">
						Event Location<span className="error">*</span>
					</label>
					<Form.Control
						id="eventLocation"
						name="eventLocation"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.eventLocation}
					/>
					{formik.touched.eventLocation && formik.errors.eventLocation ? (
						<div className="error">{formik.errors.eventLocation}</div>
					) : null}
				</Form.Group>

				<FormGroup>
					{/*Imported date/time selector */}
					<label>Event Date and Time</label>
					<br></br>
					{/*Originally i had this outside of Formik but then couldnt validate to check it was filled in, so by attaching it to formik with setFieldValue
					Because its not a normal input field it wasnt really working the usual way of using handleBlur/handleChange*/}
					<DateTimePicker
						onChange={(value) => formik.setFieldValue("inputValue", value)}
						value={formik.values.inputValue}
					/>
					{formik.touched.inputValue && formik.errors.inputValue ? (
						<div className="error">{formik.errors.inputValue}</div>
					) : null}
				</FormGroup>
				<br></br>
				<Button type="submit">Submit</Button>
			</Form>
			<br></br>
		</>
	);
}

//Split the adder and changer for ease-of-changing
function EventChanger() {
	const [noIdFound, setNoIdFound] = useState("");
	const { user } = registerCheck();

	const validate = (values) => {
		const errors = {};
		if (!values.eventID) {
			errors.eventID = "Required";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			eventID: "",
			newName: "",
			newDesc: "",
			newLocal: "",
			newDateTime: "",
		},
		validate,
		onSubmit: (values) => {
			//finds the ID in storage
			let idCheck = sessionStorage.getItem(
				"event_" + parseInt(values.eventID, 10),
			);
			if (!idCheck) {
				setNoIdFound("No ID Found");
			} else {
				setNoIdFound("");
				let eventChange = sessionStorage.getItem(
					"event_" + parseInt(values.eventID, 10),
				);
				//checks for all the changed fields and updates any new info
				//also now checks that the current user is trying to change their own event and not someone elses
				let eventChangeArray = JSON.parse(eventChange);
				if (eventChangeArray[4] === user.email) {
					if (!values.newName) {
						("");
					} else eventChangeArray[1] = values.newName;
					if (!values.newDesc) {
						("");
					} else eventChangeArray[2] = values.newDesc;
					if (!values.newLocal) {
						("");
					} else eventChangeArray[3] = values.newLocal;
					if (!values.newDateTime) {
						("");
					} else eventChangeArray[0] = values.newDateTime;
					sessionStorage.setItem(
						"event_" + values.eventID,
						JSON.stringify(eventChangeArray),
					);
				} else {
					setNoIdFound("That is not your event!");
				}
				formik.resetForm(); //clears input
			}
		},
	});
	return (
		<>
			<h2>Here you can amend any existing event</h2>
			<p>If a non-mandatory field is empty, nothing will change</p>
			<h4 className="error">{noIdFound}</h4>
			<Form onSubmit={formik.handleSubmit} className="col-md-4 container">
				<Form.Group>
					<label htmlFor="eventID">
						Event ID<span className="error">*</span>
					</label>
					<Form.Control
						id="eventID"
						name="eventID"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.eventID}
					/>
					{formik.touched.eventID && formik.errors.eventID ? (
						<div className="error">{formik.errors.eventID}</div>
					) : null}
				</Form.Group>
				<Form.Group>
					<label htmlFor="newName">New Event Name</label>
					<Form.Control
						id="newName"
						name="newName"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.newName}
					/>
				</Form.Group>
				<Form.Group>
					<label htmlFor="newDesc">New Event Description</label>
					<Form.Control
						id="newDesc"
						name="newDesc"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.newDesc}
					/>
				</Form.Group>
				<Form.Group>
					<label htmlFor="newLocal">New Event Location</label>
					<Form.Control
						id="newLocal"
						name="newLocal"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.newLocal}
					/>
				</Form.Group>
				<FormGroup>
					{/*Imported date/time selector */}
					<label>Event Date and Time</label>
					<br></br>
					<DateTimePicker
						onChange={(value) => formik.setFieldValue("newDateTime", value)}
						value={formik.values.newDateTime}
					/>
				</FormGroup>

				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}

export default function AddEvent() {
	return (
		<>
			<NavBar />
			<h1>Here you can add events!</h1>
			<EventEditor />
			<EventChanger />
		</>
	);
}
