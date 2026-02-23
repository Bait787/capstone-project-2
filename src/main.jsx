import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Contexts for login and counter
import { AuthProvider } from "./components/LoginContext.jsx";
import { EventIDProvider } from "./components/EventIDContext.jsx";
import { RegisterProvider } from "./components/RegisterContext.jsx";

/* import the different pages */
import Dashboard from "./components/Dashboard.jsx";
import Addevent from "./components/Addevent.jsx";
import Help from "./components/Help.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},

	{
		path: "/addevent",
		element: <Addevent />,
	},

	{
		path: "/help",
		element: <Help />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RegisterProvider>
			<AuthProvider>
				<EventIDProvider>
					<RouterProvider router={router} />
				</EventIDProvider>
			</AuthProvider>
		</RegisterProvider>
	</StrictMode>,
);
