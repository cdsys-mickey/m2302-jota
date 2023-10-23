import useAppFrame from "@/shared-contexts/useAppFrame";
import AppFrame from "./AppFrame";
import useAuth from "@/contexts/useAuth";

const AppFrameContainer = (props) => {
	const { ...rest } = props;
	const { menuFloating } = useAppFrame();
	const { loading } = useAuth();

	return <AppFrame menuFloating={menuFloating} loading={loading} {...rest} />;
};

AppFrameContainer.displayName = "AppFrameContainer";

export default AppFrameContainer;
