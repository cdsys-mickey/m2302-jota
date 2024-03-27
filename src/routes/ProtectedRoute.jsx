import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { BasePageContainer } from "@/frames/BasePageContainer";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";
import { MessagingProvider } from "../contexts/MessagingProvider";
import { useEffect } from "react";

const ProtectedRoute = () => {
	useEffect(() => {
		console.log("ProtectedRoute mounted");
		return () => {
			console.log("ProtectedRoute un-mounted");
		};
	}, []);

	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={350}>
				{/* <ZZPushMessagingProvider> */}
				<MessagingProvider>
					<BasePageContainer />
				</MessagingProvider>
				{/* </ZZPushMessagingProvider> */}
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
