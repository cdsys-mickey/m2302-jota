import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { BasePageContainer } from "@/frames/BasePageContainer";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";
import { MessagingProvider } from "../contexts/MessagingProvider";
import { PushMessagesProvider } from "../contexts/PushMessagesProvider";

const ProtectedRoute = () => {
	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={350}>
				{/* <PushMessagesProvider> */}
				{/* <MessagingProvider> */}
				<BasePageContainer />
				{/* </MessagingProvider> */}
				{/* </PushMessagesProvider> */}
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
