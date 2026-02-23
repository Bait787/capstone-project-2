import { createContext, useContext, useRef } from "react";

const EventIDContext = createContext();

export const EventIDProvider = ({ children }) => {
	//useRef to store the eventID
	const eventIDRef = useRef(1);

	//function to increment count
	const incrementEventID = () => {
		eventIDRef.current += 1;
	};

	return (
		<EventIDContext.Provider value={{ eventIDRef, incrementEventID }}>
			{children}
		</EventIDContext.Provider>
	);
};

export const useEventID = () => useContext(EventIDContext);
