import NavBar from "../routes/NavBar";
import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "./LoginContext";
import { registerCheck } from "./RegisterContext";

const RegisterForm = () => {
	const { isLoggedIn } = useAuth();
	const { registerUser } = registerCheck(); //Registration context so it keeps users, incase they logout - otherwise would have to register again

	const validate = (values) => {
		const errors = {};
		if (!values.passwordRegister) {
			errors.passwordRegister = "Required";
		} else if (values.passwordRegister.length < 8) {
			errors.passwordRegister = "Password must be at least 8 Characters";
		}

		if (!values.emailRegister) {
			errors.emailRegister = "Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailRegister)
		) {
			errors.emailRegister = "Invalid email address";
		}
		if (!values.nameRegiter) {
			errors.nameRegiter = "Required";
		}
		if (!values.userNameRegister) {
			errors.userNameRegister = "Required";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			emailRegister: "",
			passwordRegister: "",
			nameRegiter: "",
			userNameRegister: "",
		},
		validate,
		onSubmit: (values) => {
			alert("Account created!");
			registerUser(values.emailRegister, values.passwordRegister);
			formik.resetForm(); //clears the input boxes
		},
	});
	return (
		<>
			{isLoggedIn ? (
				//checks if theyre already logged in, if so, hides registration form
				<div></div>
			) : (
				<>
					<h2>Registration Form</h2>
					<Form onSubmit={formik.handleSubmit} className="col-md-4 container">
						<Form.Group>
							<label htmlFor="emailRegister">Email Address</label>
							<Form.Control
								id="emailRegister"
								name="emailRegister"
								type="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.emailRegister}
							/>
							{formik.touched.emailRegister && formik.errors.emailRegister ? (
								<div className="error">{formik.errors.emailRegister}</div>
							) : null}
						</Form.Group>
						<Form.Group>
							<label htmlFor="passwordRegister">Password</label>
							<Form.Control
								id="passwordRegister"
								name="passwordRegister"
								type="text"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.passwordRegister}
							/>
							{formik.touched.passwordRegister &&
							formik.errors.passwordRegister ? (
								<div className="error">{formik.errors.passwordRegister}</div>
							) : null}
						</Form.Group>
						<Form.Group>
							<label htmlFor="nameRegiter">Name</label>
							<Form.Control
								id="nameRegiter"
								name="nameRegiter"
								type="text"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.nameRegiter}
							/>
							{formik.touched.nameRegiter && formik.errors.nameRegiter ? (
								<div className="error">{formik.errors.nameRegiter}</div>
							) : null}
						</Form.Group>
						<Form.Group>
							<label htmlFor="userNameRegister">Username</label>
							<Form.Control
								id="userNameRegister"
								name="userNameRegister"
								type="text"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.userNameRegister}
							/>
							{formik.touched.userNameRegister &&
							formik.errors.userNameRegister ? (
								<div className="error">{formik.errors.userNameRegister}</div>
							) : null}
						</Form.Group>
						<Button type="submit">Submit</Button>
					</Form>
				</>
			)}
		</>
	);
};

const LoginForm = () => {
	const { isLoggedIn, login, logout } = useAuth(); //Login context so it persists across pages
	const { loginUser } = registerCheck();

	//Formik Validation, checks for password length, valid email addreess and returns any errors
	const validate = (values) => {
		const errors = {};
		if (!values.password) {
			errors.password = "Required";
		} else if (values.password.length < 8) {
			errors.password = "Password must be at least 8 Characters";
		}

		if (!values.email) {
			errors.email = "Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate,
		onSubmit: (values) => {
			const loggedIn = loginUser(values.email, values.password); //Call loginUser from context
			if (!loggedIn) {
				alert("Invalid credentials");
			} else {
				login(); //login context hook, sets logged in to true - toggles display
				formik.resetForm(); //clears input boxes
			}
		},
	});

	return (
		<>
			{!isLoggedIn ? (
				<>
					<h2>Login Form</h2>
					<Form onSubmit={formik.handleSubmit} className="col-md-4 container">
						<Form.Group>
							<label htmlFor="email">Email Address</label>
							<Form.Control
								id="email"
								name="email"
								type="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="error">{formik.errors.email}</div>
							) : null}
						</Form.Group>
						{/*If there is an error, displays it here, else null 
				"touched" allows the error to only show if the user has clicked on that specific box*/}
						<Form.Group>
							<label htmlFor="password">Password</label>
							<Form.Control
								id="password"
								name="password"
								type="text"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
							{formik.touched.password && formik.errors.password ? (
								<div className="error">{formik.errors.password}</div>
							) : null}
						</Form.Group>
						<Button type="submit">Submit</Button>
					</Form>
				</>
			) : (
				//Dashboard renders upon login
				<div>
					<h1>Here is your Dashboard!</h1>
					<Button onClick={logout}>Logout?</Button>
					<hr></hr>
					<CardDisplay /> {/*Renders the card display below */}
				</div>
			)}
		</>
	);
};

function CardDisplay() {
	//sets events to whats in storage
	const [events, setEvents] = useState(getEventData);
	//finds the event.key in the array and removes it from both the dashboard and storage
	const removeEvent = (keyToRemove) => {
		setEvents(events.filter((event) => event.key !== keyToRemove));
		sessionStorage.removeItem(keyToRemove);
	};

	//it displayed the cards in a completly random order, this now sorts it by ID
	const sortedEvents = [...events].sort((a, b) => {
		const aId = parseInt(a.key.replace("event_", ""), 10); //removes the "event_" and parses them into integers
		const bId = parseInt(b.key.replace("event_", ""), 10);
		return aId - bId; //sort based on the ID low > hi
	});

	return (
		<>
			<div>
				<Row>
					{sortedEvents.map((eventObj) => (
						<Col key={eventObj.key} md={3} className="col-md-3">
							<Card>
								<Card.Body>
									<Card.Title>{eventObj.value[1]}</Card.Title>
									<Card.Text>
										<strong>Date & Time:</strong>{" "}
										{new Date(eventObj.value[0]).toLocaleString()} <br />{" "}
										{/*translates the date/time back to string */}
										<strong>Event Details:</strong> {eventObj.value[2]} <br />
										<strong>Event Location:</strong> {eventObj.value[3]} <br />
										<strong>Event Id:</strong>{" "}
										{eventObj.key.replace("event_", "")}{" "}
										{/*removes the event_ prefix so its just the number */}
									</Card.Text>
								</Card.Body>
								<Button
									className="btn btn-danger"
									onClick={() => removeEvent(eventObj.key)}
								>
									Remove Event
								</Button>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
}

//pulls all events in storage into one giant array so it can be mapped
function getEventData() {
	const { user } = registerCheck();
	const events = [];
	for (let i = 0; sessionStorage.length > i; i++) {
		const key = sessionStorage.key(i);
		//looks for the current users email matches the one in the array
		if (key.startsWith("event_")) {
			const value = sessionStorage.getItem(key);
			const eventData = JSON.parse(value);
			if (eventData[4] === user.email) {
				events.push({ key, value: eventData });
			}
		}
	}
	return events;
}

export default function Dashboard() {
	return (
		<>
			<NavBar />
			<RegisterForm />
			<LoginForm />
		</>
	);
}
