/* eslint-disable no-mixed-spaces-and-tabs */
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useCallback } from "react";
import B06 from "@/modules/md-b06";
import { useAppModule } from "./useAppModule";
import useHttpPost from "@/shared-hooks/useHttpPost";

export const useB06 = ({ token, logKey, deptId }) => {
	const appModule = useAppModule({
		token,
		moduleId: "B06",
	});

	const listLoader = useInfiniteLoader({
		url: "v1/prod/inquiry-details",
		bearer: token,
		initialFetchSize: 50,
	});

	const { postToBlank } = useHttpPost();

	// const handleSelect = useCallback((e, item) => {
	// 	e?.stopPropagation();
	// 	console.log("handleSelect", item);
	// }, []);

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

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const collected = {
				...B06.transformForPrinting(data),
				DeptID: deptId,
			};
			console.log("collected", collected);

			postToBlank(
				`${
					import.meta.env.VITE_URL_REPORT
				}/WebB06Rep.aspx?LogKey=${logKey}`,
				{
					jsonData: JSON.stringify(collected),
				}
			);
		},
		[deptId, logKey, postToBlank]
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
	};
};
