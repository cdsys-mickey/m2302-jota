import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { BasePageContainer } from "@/frames/BasePageContainer";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";
import { MessagingProvider } from "../contexts/MessagingProvider";

const ProtectedRoute = () => {
	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={350}>
				<MessagingProvider>
					<BasePageContainer />
				</MessagingProvider>
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
