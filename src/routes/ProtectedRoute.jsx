import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { BasePageContainer } from "@/frames/BasePageContainer";

import AppFrameProvider from "@/shared-contexts/app-frame/AppFrameProvider";

const ProtectedRoute = () => {
	return (
		<AuthProvider>
			<AppFrameProvider drawerWidth={350}>
				<BasePageContainer />
			</AppFrameProvider>
		</AuthProvider>
	);
};

export default ProtectedRoute;
