import PropTypes from "prop-types";
import { AppContext } from "./AppContext";
import useApp from "./useApp";
import Cookies from "js-cookie";
import { toastEx, useRunOnce } from "shared-components";

export const AppProvider = ({ children }) => {
	const app = useApp();

	useRunOnce(() => {
		const updatedVersion = Cookies.get("just-updated");

		if (updatedVersion) {
			// 顯示含版號的成功訊息
			toastEx.success(`系統已成功更新至最新版本 ${updatedVersion}！`, {
				position: "top-center",
				autoClose: 5000, // 給使用者多一點時間看版號
			});

			// 務必移除，避免重複觸發
			Cookies.remove("just-updated");
		}
	});

	return (
		<AppContext.Provider
			value={{
				...app
			}}>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node,
};
