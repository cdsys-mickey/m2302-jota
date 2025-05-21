import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import G04 from "@/modules/G04/G04.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useState } from "react";
import { useCallback, useContext, useMemo } from "react";

export const useG04 = () => {
	const [selectedTab, setSelectedTab] = useState(G04.Tabs.CREATE);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G04",
	});
	const { httpGetAsync } = useWebApi();

	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);

		},
		[]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);


	return {
		...appModule,
		onSubmit,
		onSubmitError,
		selectedTab,
		handleTabChange
	};
};




