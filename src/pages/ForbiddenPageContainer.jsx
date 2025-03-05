import { AppContext } from "@/contexts/app/AppContext";
import { useInit } from "@/shared-hooks/useInit";
import InfoPage from "@/shared-pages/InfoPage";
import { useContext } from "react";

const ForbiddenPageContainer = (props) => {
	const { ...rest } = props;
	const app = useContext(AppContext);
	const { unloadAppInfo } = app;

	useInit(() => {
		unloadAppInfo();
	}, []);


	return (
		<InfoPage
			severity="error"
			alertProps={
				{
					// maxWidth:
				}
			}
			title="您沒有使用權限"
			message="請聯絡系統管理員"
			{...rest}
		/>);
}

ForbiddenPageContainer.displayName = "ForbiddenPageContainer";
export default ForbiddenPageContainer;