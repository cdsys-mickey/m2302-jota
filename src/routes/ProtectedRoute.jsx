import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { UnreadMessagesProvider } from "@/contexts/UnreadMessagesProvider";
import { BaseFrame } from "@/modules";
import { SharedOptionsProvider } from "@/shared-components/option-picker/SharedOptionsProvider";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";

const ProtectedRoute = () => {
	return (
		<SharedOptionsProvider>
			<AuthProvider>
				<AppFrameProvider drawerWidth={300}>
					<UnreadMessagesProvider>
						<BaseFrame />
					</UnreadMessagesProvider>
				</AppFrameProvider>
			</AuthProvider>
		</SharedOptionsProvider >
	);
};

export default ProtectedRoute;
