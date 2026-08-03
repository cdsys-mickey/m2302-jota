import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { REBContext } from "./REBContext";
import { useREB } from "./useREB";
import { useCallback, useContext, useMemo, useState } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import REB from "./REB.mjs";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useCrud } from "@/shared-hooks/useCrud";
import { useWebApiAsync } from "@/shared-hooks";
import F07 from "../md-f07";
import { useInit } from "@/shared-hooks/useInit";


export const REBProvider = ({ children }) => {
	const crud = useCrud();
	const { httpGetAsync } = useWebApiAsync();
	const [selectedTab, setSelectedTab] = useState(REB.TabType.SALES_DATA);
	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);
	const auth = useContext(AuthContext);
	const { token, operator } = auth;

	const appModule = useAppModule({
		token,
		moduleId: "REB",
	});

	const load = useCallback(
		async ({ refresh = false, id } = {}) => {
			try {
				if (!refresh) {
					crud.startLoading("讀取中...");
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/data/prev-inv",
					bearer: token,
					...(id && {
						params: {
							d: id,
						},
					}),
				});
				if (status.success) {
					const data = F07.transformForReading(payload.data[0]);
					console.log("data", data);
					crud.finishedLoading({
						data: data,
					});
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedLoading(err);
			}
		},
		[crud, httpGetAsync, token],
	);

	const contextValue = useMemo(() => {
		return {
			...appModule,
			...crud,
			handleTabChange,
			selectedTab,
			load
		}
	}, [appModule, crud, handleTabChange, load, selectedTab])

	useInit(() => {
		load();
	});

	return (
		<REBContext.Provider
			value={contextValue}>
			{children}
		</REBContext.Provider>
	);
};

REBProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








