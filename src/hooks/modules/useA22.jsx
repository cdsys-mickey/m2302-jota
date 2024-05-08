import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDSG } from "@/shared-hooks/useDSG";
import { useToggle } from "@/shared-hooks/useToggle";
import Errors from "@/shared-modules/sd-errors";
import Objects from "@/shared-modules/sd-objects";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useRef } from "react";
import A22 from "@/modules/md-a22";
import useHttpPost from "../../shared-hooks/useHttpPost";
import { AuthContext } from "../../contexts/auth/AuthContext";

export const useA22 = ({
	token,
	gridId,
	// keyColumn,
	// otherColumns,
	// transformAsQueryParams,
	// transformForSubmit,
	// transformForGridEdior,
}) => {
	const { operator } = useContext(AuthContext);
	const { httpGetAsync } = useWebApi();
	const [expanded, toggleExpanded] = useToggle(false);
	const { postToBlank } = useHttpPost();

	const appFrame = useContext(AppFrameContext);
	const recoverDrawerOpen = useRef();

	const [state, setState] = useState({
		saveKey: null,
		totalElements: null,
		loading: null,
	});
	const dsg = useDSG({
		gridId,
		keyColumn: "ProdID",
		otherColumns: "ProdData,Barcode,Qty",
	});
	const { gridData, dirtyIds } = dsg;

	const toggleEditorLock = useCallback(() => {
		if (dsg.readOnly) {
			recoverDrawerOpen.current = appFrame.drawerOpen;
			console.log(`og drawer opened memoised`);
			appFrame.handleDrawerClose();
		} else {
			if (recoverDrawerOpen.current === true) {
				appFrame.handleDrawerOpen();
			}
		}
		dsg.toggleReadOnly();
	}, [appFrame, dsg]);

	const peek = useCallback(
		async (criteria) => {
			console.log("criteria", criteria);
			if (!token) {
				throw new Error("token not specified");
			}
			if (
				Objects.isAllPropsEmpty(criteria, "prod1,prod2,catL,catM,catS")
			) {
				setState((prev) => ({
					...prev,
					saveKey: null,
					totalElements: null,
				}));
				return;
			}
			setState((prev) => ({
				...prev,
				loading: true,
			}));
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/prod/barcodes",
					bearer: token,
					params: {
						...A22.transformAsQueryParams(criteria),
						pk: 1,
					},
				});
				if (status.success) {
					setState((prev) => ({
						...prev,
						saveKey: payload.Select?.SaveKey,
						totalElements: payload.Select?.TotalRecord,
					}));
				} else {
					throw error;
				}
			} catch (err) {
				console.error("peek failed", err);
				toast.error(Errors.getMessage("篩選失敗", err));
			} finally {
				setState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[httpGetAsync, token]
	);

	const unload = useCallback(() => {
		dsg.handleGridDataLoaded(null);
	}, [dsg]);

	const load = useCallback(
		async (criteria) => {
			console.log(`saveKey`, state.saveKey);
			console.log("criteria", criteria);
			if (!token) {
				throw new Error("token not specified");
			}

			dsg.setGridLoading(true);

			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/barcodes",
					bearer: token,
					params: {
						...A22.transformAsQueryParams(criteria),
						...(state.saveKey && {
							sk: state.saveKey,
						}),
					},
				});
				if (status.success) {
					dsg.handleGridDataLoaded(
						A22.transformForGridEdior(payload)
					);
				} else {
					switch (status.code) {
						default:
							toast.error(`發生未預期例外 ${status.code}`);
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				dsg.setGridLoading(false);
				setState((prev) => ({
					...prev,
					saveKey: null,
				}));
			}
		},
		[dsg, httpGetAsync, state.saveKey, token]
	);

	const onSubmit = useCallback(
		(data) => {
			console.log(`onSubmit`, data);
			load(data);
		},
		[load]
	);

	const onSubmitError = useCallback((err) => {
		console.error(`onSubmitError`, err);
	}, []);

	const genReport = useCallback(async () => {
		console.log(`handleSave`, gridData);
		const collected = A22.transformForSubmit(gridData);
		console.log("collected", collected);
		// const payload = {
		// 	Action,
		// };
		// postToBlank(
		// 	`${import.meta.env.VITE_URL_REPORT}/WebA19Rep.aspx?LogKey=${
		// 		operator.LogKey
		// 	}`,
		// 	{
		// 		jsonData: JSON.stringify(payload),
		// 	}
		// );
	}, [gridData]);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return rowData?.prod?.ProdID || rowIndex;
	}, []);

	const onGenReportSubmit = useCallback(
		(data) => {
			console.log("onGenReportSubmit", data);
			const collected = A22.transformForSubmit(gridData, data);
			console.log("collected", collected);
			const payload = {
				...collected,
				DeptId: operator.CurDeptID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebA22Rep.aspx?LogKey=${
					operator.LogKey
				}`,
				{
					jsonData: JSON.stringify(payload),
				}
			);
		},
		[gridData, operator.CurDeptID, operator.LogKey, postToBlank]
	);

	const onGenReportSubmitError = useCallback((err) => {
		console.error("onGenReportSubmitError", err);
	}, []);

	const handleDeleteRow = useCallback(
		(fromRow, toRow) => {
			const { rowIndex: fromRowIndex } = fromRow;
			const { rowIndex: toRowIndex } = toRow || {};
			dsg.removeByRowIndex(fromRowIndex, toRowIndex);
		},
		[dsg]
	);

	const handleCreateRow = useCallback(
		() => ({
			prod: null,
		}),
		[]
	);

	const handleGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const { prod } = rowData;
							const rowIndex = operation.fromRowIndex + i;
							const ogRowData = gridData[rowIndex];
							const { prod: ogProd } = ogRowData;
							if (prod?.ProdID !== ogProd?.ProdID) {
								console.log(`prod[${rowIndex}] changed`, prod);

								newGridData[rowIndex] = {
									...rowData,
									["Barcode"]: prod?.Barcode || "",
									["PackData"]: prod?.PackData_N || "",
								};
							}
						});
				} else if (operation.type === "DELETE") {
					dsg.removeByRowIndex(
						operation.fromRowIndex,
						operation.toRowIndex
					);
				}
				dsg.setGridData(newValue);
			}
		},
		[dsg, gridData]
	);

	return {
		load,
		unload,
		...dsg,
		// form
		onSubmit,
		onSubmitError,
		...state,
		peek,
		expanded,
		toggleExpanded,
		toggleEditorLock,
		getRowKey,
		genReport,
		onGenReportSubmit,
		onGenReportSubmitError,
		handleDeleteRow,
		handleCreateRow,
		handleGridChange,
	};
};
