import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { PushMessagesProvider } from "@/contexts/PushMessagesContext";
import { BasePageContainer } from "@/frames/BasePageContainer";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";

const ProtectedRoute = () => {
	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={350}>
				<PushMessagesProvider>
					<BasePageContainer />
				</PushMessagesProvider>
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
