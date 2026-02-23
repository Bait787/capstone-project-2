import { createContext, useContext, useState } from "react";

const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	//stores all created user in an array, letting you have multiple logins
	const [users, setUsers] = useState([]);

	//Register function
	const registerUser = (email, password, name, userName) => {
		//creates a new user and add to the array
		const newUser = { email, password, name, userName };
		setUsers([...users, newUser]);
		setUser(newUser);
	};

	//Login function finds if theyre "registered" in the array
	const loginUser = (email, password) => {
		const foundUser = users.find(
			(user) => user.email === email && user.password === password,
		);
		if (foundUser) {
			setUser(foundUser);
			return true;
		}
		return false;
	};

	return (
		<RegisterContext.Provider value={{ user, users, registerUser, loginUser }}>
			{children}
		</RegisterContext.Provider>
	);
};

export const registerCheck = () => useContext(RegisterContext);
