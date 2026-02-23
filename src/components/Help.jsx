import NavBar from "../routes/NavBar.jsx";

function Guide() {
	return (
		<div className="container help">
			<h1 className="titles">Welcome to the help page!</h1>
			<h4>This will quickly run through a few things:</h4>
			<ul>
				<li>Navigation</li>
				<li>Registration and Login</li>
				<li>Event Creation</li>
				<li>Event Amendments</li>
			</ul>
			<br></br>
			<h4>Naviagtion</h4>
			<p>
				You can navigate to any page using the bar in the top left. Once logged
				in, you can freely move around without worry of being logged out
			</p>
			<br></br>
			<h4>Registration and Login</h4>
			<p>
				You can register as many accounts as you want on the Dashboard and then
				login using those credentials. Your password must be atleast 8
				characters long and your email valid
			</p>
			<br></br>
			<h4>Event Creation</h4>
			<p>
				You can create events in the "Add Event" tab. You can input the name,
				location, a description and the date/time. Then, they will all display
				on the Dashboard in creation order
			</p>
			<br></br>
			<h4>Event Amendments</h4>
			<p>
				You can amend any event at any time on the "Add Event" tab. Simply input
				the event ID (can be found on the card, e.g. "1") and you can change any
				details. If you leave a field blank, no details will be changed,
				allowing you to change just one or two details
			</p>
		</div>
	);
}

export default function Help() {
	return (
		<>
			<NavBar />
			<Guide />
		</>
	);
}
