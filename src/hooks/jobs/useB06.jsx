/* eslint-disable no-mixed-spaces-and-tabs */
import B06 from "@/modules/md-b06";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useCallback } from "react";
import { useAppModule } from "./useAppModule";
import { useMemo } from "react";
import useJotaReports from "../useJotaReports";
import { useContext } from "react";
import { B05Context } from "@/contexts/B05/B05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const useB06 = () => {
	const auth = useContext(AuthContext);
	const appModule = useAppModule({
		moduleId: "B06",
	});

	const b05 = useContext(B05Context);

	const listLoader = useInfiniteLoader({
		url: "v1/prod/inquiry-details",
		bearer: auth.token,
		initialFetchSize: 50,
	});

	// const { postToBlank } = useHttpPost();

	const handleInqIdClick = useCallback((e, rowData) => {
		e?.stopPropagation();
		console.log("handleInqIdClick", rowData);
		if (b05 && rowData.InqID_N) {
			b05.cancelAction();
			b05.loadItem({ id: rowData.InqID_N });
		}
	}, [b05]);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log(`onSearchSubmit`, data);
			const collected = B06.transformForSearchSubmitting(data);
			console.log("collected", collected);

			listLoader.loadList({
				params: collected,
			});
		},
		[listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebB06Rep.aspx`
	}, [])

	const reports = useJotaReports({ from: "InqDate1", to: "InqDate2" });

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const collected = {
				...B06.transformForPrinting(data),
				DeptID: auth.operator?.CurDeptID,
			};
			console.log("collected", collected);

			// postToBlank(
			// 	`${import.meta.env.VITE_URL_REPORT
			// 	}/WebB06Rep.aspx?LogKey=${logKey}`,
			// 	{
			// 		jsonData: JSON.stringify(collected),
			// 	}
			// );
			reports.open(reportUrl, collected);
		},
		[auth.operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	return {
		...listLoader,
		// Popper
		onSearchSubmit,
		onSearchSubmitError,
		onPrintSubmit,
		onPrintSubmitError,
		// handleSelect,
		...appModule,
		handleInqIdClick
	};
};
