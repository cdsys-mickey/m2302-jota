import { AuthProvider } from "@/contexts/AuthContext";
import { PushMessagesProvider } from "@/contexts/PushMessagesContext";
import { FrameBaseContainer } from "@/frames/FrameBaseContainer";
import { ProtectedLayoutProvider } from "@/shared-contexts/ProtectedLayoutContext";
import { ResponsiveProvider } from "@/shared-contexts/ResponsiveContext";

const ProtectedRoute = ({ ...rest }) => {
	return (
		<ResponsiveProvider>
			<AuthProvider>
				<ProtectedLayoutProvider>
					<PushMessagesProvider>
						<FrameBaseContainer {...rest} />
					</PushMessagesProvider>
				</ProtectedLayoutProvider>
			</AuthProvider>
		</ResponsiveProvider>
	);
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
