import AppFrame from "./AppFrame";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";
import { useAuth } from "@/contexts/useAuth";

const AppFrameContainer = (props) => {
	const { ...rest } = props;
	const { menuFloating } = useProtectedLayout();
	const { loading } = useAuth();

	return <AppFrame menuFloating={menuFloating} loading={loading} {...rest} />;
};

AppFrameContainer.displayName = "AppFrameContainer";

export default AppFrameContainer;
