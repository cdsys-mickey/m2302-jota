import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { MessagingProvider } from "@/contexts/messaging/MessagingProvider";
import { PushMessagesProvider } from "@/contexts/PushMessagesProvider";
import { BaseFrame } from "@/modules";
import { SharedOptionsProvider } from "@/shared-components/option-picker/SharedOptionsProvider";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";

const ProtectedRoute = () => {
	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={300}>
				<PushMessagesProvider>
					<MessagingProvider>
						<SharedOptionsProvider>
							<BaseFrame />
						</SharedOptionsProvider>
					</MessagingProvider>
				</PushMessagesProvider>
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
