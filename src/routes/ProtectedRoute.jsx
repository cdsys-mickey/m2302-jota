import { AuthProvider } from "@/contexts/AuthContext";
import { PushMessagesProvider } from "@/contexts/PushMessagesContext";
import { BasePageContainer } from "@/frames/BasePageContainer";
import { ResponsiveProvider } from "@/shared-contexts/ResponsiveProvider";
import AppFrameProvider from "../shared-contexts/AppFrameProvider";

const ProtectedRoute = () => {
	return (
		<ResponsiveProvider>
			<AuthProvider>
				<AppFrameProvider drawerWidth={350}>
					<PushMessagesProvider>
						<BasePageContainer />
					</PushMessagesProvider>
				</AppFrameProvider>
			</AuthProvider>
		</ResponsiveProvider>
	);
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
