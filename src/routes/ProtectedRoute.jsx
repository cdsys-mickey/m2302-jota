import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { UnreadMessagesProvider } from "@/contexts/UnreadMessagesProvider";
import { BaseFrame } from "@/modules";
import { SharedOptionsProvider } from "@/shared-components/option-picker/SharedOptionsProvider";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";

const ProtectedRoute = () => {
	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={300}>
				{/* <MessagingProvider> */}
				<UnreadMessagesProvider>
					<SharedOptionsProvider>
						<BaseFrame />
					</SharedOptionsProvider>
				</UnreadMessagesProvider>
				{/* </MessagingProvider> */}
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
