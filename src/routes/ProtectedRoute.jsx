import { AuthProvider } from "@/contexts/AuthContext";
import { PushMessagesProvider } from "@/contexts/PushMessagesContext";
import { FrameBaseContainer } from "@/frames/FrameBaseContainer";
import { ResponsiveProvider } from "@/shared-contexts/ResponsiveContext";
import { AppFrameProvider } from "../shared-contexts/AppFrameContext";

const ProtectedRoute = () => {
	return (
		<ResponsiveProvider>
			<AuthProvider>
				<AppFrameProvider>
					<PushMessagesProvider>
						<FrameBaseContainer />
					</PushMessagesProvider>
				</AppFrameProvider>
			</AuthProvider>
		</ResponsiveProvider>
	);
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
