import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import toastEx from "@/helpers/toastEx";
import A22 from "@/modules/md-a22";
import { createIntColumn } from "@/shared-components/dsg/columns/float/createIntColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Objects from "@/shared-modules/Objects.mjs";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { keyColumn } from "react-datasheet-grid";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";

export const useA22 = ({ form }) => {
	const { operator, token } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const { httpGetAsync } = useWebApi();
	const [expanded, toggleExpanded] = useToggle(true);

	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();
	const recoverDrawerOpen = useRef();

	const [state, setState] = useState({
		saveKey: null,
		totalElements: null,
		loading: null,
	});
	const grid = useDSG({
		gridId: "A22",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Barcode,Qty",
	});

	const columns = useMemo(
		() => [
			// {
			// 	...keyColumn(
			// 		"prod",
			// 		prodPickerColumn({
			// 			name: "prod",
			// 		})
			// 	),
			// 	title: "商品",
			// 	grow: 8,
			// 	disabled: readOnly,
			// },
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						selectOnFocus: true,
						triggerDelay: 300,
						placeholder: "組合商品",
						typeToSearchText: "請輸入商品編號或名稱進行搜尋",
						// queryRequired: true,
						// filterByServer: true,
						// disableOpenOnInput: true,
						// hideControlsOnActive: true,
						forId: true,
						disableClearable: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "商品編號",
				minWidth: 122,
				maxWidth: 140,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"ProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "商品名稱",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn(
					"Barcode",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "原印條碼",
				minWidth: 220,
				maxWidth: 220,
				disabled: true,
			},
			// {
			// 	...keyColumn(
			// 		"PackData",
			// 		createTextColumn({
			// 			continuousUpdates: false,
			// 		})
			// 	),
			// 	title: "包裝單位",
			// 	grow: 1,
			// 	disabled: readOnly,
			// },
			{
				...keyColumn("Qty", createIntColumn()),
				title: "張數",
				minWidth: 80,
				// maxWidth: 80,
				disabled: grid.readOnly,
			},
		],
		[grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		data: grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const toggleEditorLock = useCallback(() => {
		if (grid.readOnly) {
			recoverDrawerOpen.current = appFrame.drawerOpen;
			console.log(`og drawer opened memoised`);
			appFrame.handleDrawerClose();
		} else {
			if (recoverDrawerOpen.current === true) {
				appFrame.handleDrawerOpen();
			}
		}
		grid.toggleReadOnly();
	}, [appFrame, grid]);

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
				toastEx.error("篩選失敗", err);
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
		grid.handleGridDataLoaded(null);
	}, [grid]);

	const load = useCallback(
		async (criteria) => {
			console.log(`saveKey`, state.saveKey);
			console.log("criteria", criteria);
			if (!token) {
				throw new Error("token not specified");
			}

			grid.setGridLoading(true);

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
					grid.handleGridDataLoaded(A22.transformForReading(payload));
				} else {
					switch (status.code) {
						default:
							toastEx.error(`發生未預期例外 ${status.code}`);
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				grid.setGridLoading(false);
				setState((prev) => ({
					...prev,
					saveKey: null,
				}));
			}
		},
		[grid, httpGetAsync, state.saveKey, token]
	);

	// const genReport = useCallback(async () => {
	// 	console.log(`handleSave`, grid.gridData);
	// 	const collected = A22.transformForSubmitting(grid.gridData);
	// 	console.log("collected", collected);
	// }, [grid.gridData]);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return rowData?.prod?.ProdID || rowIndex;
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebA22Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports();

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const collected = A22.transformForSubmitting(
				grid.gridData,
				payload
			);
			const data = {
				...collected,
				DeptId: operator.CurDeptID,
			};
			debugDialog.show({
				data,
				url: reportUrl,
				title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}`,
			});
		},
		[
			appFrame.menuItemSelected?.JobID,
			appFrame.menuItemSelected?.JobName,
			debugDialog,
			grid.gridData,
			operator.CurDeptID,
			reportUrl,
		]
	);

	const onGenReportSubmit = useCallback(
		(payload) => {
			console.log("onGenReportSubmit", payload);
			const data = {
				...A22.transformForSubmitting(grid.gridData, payload),
				DeptId: operator.CurDeptID,
			};
			console.log("data", data);

			reports.open(reportUrl, data);
		},
		[grid.gridData, operator.CurDeptID, reportUrl, reports]
	);

	const onGenReportSubmitError = useCallback((err) => {
		console.error("onGenReportSubmitError", err);
	}, []);

	const handleDeleteRow = useCallback(
		(fromRow, toRow) => {
			const { rowIndex: fromRowIndex } = fromRow;
			const { rowIndex: toRowIndex } = toRow || {};
			grid.removeRowByIndex(fromRowIndex, toRowIndex);
		},
		[grid]
	);

	const handleCreateRow = useCallback(
		() => ({
			prod: null,
		}),
		[]
	);

	const handleGridProdChange = useCallback(({ rowData }) => {
		const { prod } = rowData;
		return {
			...rowData,
			["ProdData"]: prod?.ProdData || "",
			["Barcode"]: prod?.Barcode || "",
			["PackData"]: prod?.PackData_N || "",
		};
	}, []);

	const onUpdateRow = useCallback(
		({
				fromRowIndex,
				formData,
				newValue,
				setValue,
				gridMeta,
				updateResult,
			}) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// prod
				if (processedRowData.prod?.ProdID != oldRowData.prod?.ProdID) {
					console.log(
						`prod[${rowIndex}] changed`,
						processedRowData?.prod
					);
					processedRowData = await handleGridProdChange({
						rowData: processedRowData,
						formData,
					});
				}
				return processedRowData;
			},
		[grid.gridData, handleGridProdChange]
	);

	// comment on 25.01.22, prepared to remove
	// const handleGridChange = useCallback(
	// 	(newValue, operations) => {
	// 		const newGridData = [...newValue];
	// 		let checkFailed = false;
	// 		for (const operation of operations) {
	// 			if (operation.type === "UPDATE") {
	// 				newValue
	// 					.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					.forEach((rowData, i) => {
	// 						const rowIndex = operation.fromRowIndex + i;
	// 						const ogRowData = grid.gridData[rowIndex];
	// 						let processedRowData = { ...rowData };

	// 						if (rowData.prod?.ProdID !== ogRowData?.prod?.ProdID) {
	// 							console.log(`prod[${rowIndex}] changed`, rowData.prod);
	// 							processedRowData = handleGridProdChange({
	// 								rowData: processedRowData,
	// 							});
	// 						}
	// 						newGridData[rowIndex] = processedRowData;
	// 					});
	// 			} else if (operation.type === "DELETE") {
	// 				// grid.removeRowByIndex(
	// 				// 	operation.fromRowIndex,
	// 				// 	operation.toRowIndex
	// 				// );
	// 				newGridData.splice(operation.fromRowIndex, operation.toRowIndex - operation.fromRowIndex + 1);
	// 			} else if (operation.type === "CREATE") {
	// 				console.log("dsg.CREATE");
	// 				// process CREATE here
	// 				gridMeta.toFirstColumn({ nextRow: true });
	// 			}
	// 			if (!checkFailed) {
	// 				grid.setGridData(newGridData);
	// 			}
	// 		}
	// 	},
	// 	[grid, gridMeta, handleGridProdChange]
	// );

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

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(onSubmit, onSubmitError);
	}, [form, onSubmit, onSubmitError]);

	const formMeta = useFormMeta(
		`
		prod1,
		prod2,
		qty,
		catL,
		catM,
		catS
		`,
		{
			lastField: handleSubmit,
		}
	);

	return {
		load,
		unload,
		...grid,
		...gridMeta,
		gridMeta,
		// form
		onSubmit,
		onSubmitError,
		...state,
		peek,
		expanded,
		toggleExpanded,
		toggleEditorLock,
		getRowKey,
		// genReport,
		onGenReportSubmit,
		onGenReportSubmitError,
		handleDeleteRow,
		handleCreateRow,
		// handleGridChange,
		formMeta,
		onUpdateRow,
		onDebugSubmit,
	};
};
