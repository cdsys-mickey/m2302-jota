import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import Users from "@/modules/md-users";
import ZA03 from "@/modules/md-za03";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useDSG } from "@/shared-hooks/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ActionState from "../../shared-constants/action-state";
import { useAppModule } from "./useAppModule";
import { useInit } from "../../shared-hooks/useInit";

export const useZA03 = () => {
	const [selectedTab, setSelectedTab] = useState(Users.Tabs.INFO);
	const crud = useContext(CrudContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "ZA03",
	});
	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const loader = useInfiniteLoader({
		url: "v1/ou/users",
		bearer: token,
		initialFetchSize: 50,
	});

	// Auth Grid
	const authGrid = useDSG({
		gridId: "auth",
		// keyColumn: "module.JobID",
		keyColumn: "JobID",
	});

	const loadAuthAction = useAction();

	// const resetGridLoading = useCallback(() => {
	// 	loadAuthAction.clear();
	// }, [loadAuthAction]);

	const authGridLoading = useMemo(() => {
		return loadAuthAction.state === ActionState.WORKING;
	}, [loadAuthAction.state]);

	const loadAuthorities = useCallback(
		async (userId) => {
			try {
				loadAuthAction.start();
				const { status, payload, error } = await httpGetAsync({
					url: "v1/ou/user/authorities",
					bearer: token,
					params: {
						uid: userId,
					},
				});
				if (status.success) {
					const data = payload.map((x) =>
						ZA03.transformForReading(x)
					);
					authGrid.handleGridDataLoaded(data);
					loadAuthAction.finish(data);
				} else {
					throw error || new Error("讀取權限失敗");
				}
			} catch (err) {
				loadAuthAction.fail(err);
				toast.error(err?.message);
			}
		},
		[authGrid, httpGetAsync, loadAuthAction, token]
	);

	const reloadAuthorities = useCallback(() => {
		if (crud.itemData?.UID) {
			loadAuthorities(crud.itemData?.UID);
		}
	}, [crud.itemData?.UID, loadAuthorities]);

	const promptCreating = useCallback(async () => {
		crud.promptCreating({
			LoginName: "",
			UserName: "",
			Tel: "",
			Cel: "",
			Email: "",
			// DeptID: operator.CurDeptID,
			// Dept_N: operator.CurDeptName,
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
		});
		// crud.doneReading();
	}, [crud, operator.CurDeptID, operator.CurDeptName]);

	const loadItem = useCallback(
		async (id) => {
			crud.startReading();
			try {
				const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/ou/users`,
					bearer: token,
					params: {
						id: encodedId,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = Users.transformForReading(payload);
					crud.doneReading(data);
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem(rowData.UID);
		},
		[crud, loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitUpdating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
			},
		});
	}, [crud, dialogs]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return rowData?.module?.JobID || rowIndex;
	}, []);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error, payload } = await httpPostAsync({
					url: "v1/ou/users",
					data: data,
					bearer: token,
				});

				if (status.success) {
					const processed = Users.transformForReading(payload);
					toast.success(
						`使用者「${processed?.LoginName} ${processed?.UserName}」新增成功`
					);

					crud.doneCreating();
					crud.doneReading(processed);
					// crud.cancelReading();
					// 重新整理
					loader.loadList({ useLastParams: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, loader, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url: `v1/ou/users`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`使用者 ${data?.LoginName} ${data?.UserName}」修改成功`
					);
					crud.doneUpdating();
					await loadItem(data?.UID);
					// 重新整理
					loader.loadList({ useLastParams: true });
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("handleUpdate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, loadItem, loader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			const processed = Users.transformForEditorSubmit(data);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate({ data: processed });
			} else if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, handleCreate, handleUpdate]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`ZA03.onSubmitError`, err);
		toast.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	// const promptCreating = useCallback(
	// 	(e) => {
	// 		e?.stopPropagation();
	// 		const data = {};
	// 		crud.doneReading(data);
	// 		crud.promptCreating(data);
	// 	},
	// 	[crud]
	// );

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除「${crud.itemData?.LoginName} ${crud.itemData?.UserName}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/ou/users`,
						bearer: token,
						params: {
							id: crud.itemData?.UID,
						},
					});
					crud.cancelAction();
					if (status.success) {
						toast.success(
							`成功删除 ${crud.itemData?.LoginName} ${crud.itemData.UserName}`
						);
						loader.loadList({ useLastParams: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err));
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, loader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log(`onSearchSubmit`, data);
			loader.loadList({
				params: data,
			});
		},
		[loader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleTabChange = useCallback(
		(e, newValue) => {
			setSelectedTab(newValue);
			if (
				newValue === Users.Tabs.AUTH &&
				loadAuthAction.state === null &&
				crud.itemData?.UID
			) {
				// 載入 grid
				loadAuthorities(crud.itemData?.UID);
			}
		},
		[loadAuthAction.state, crud.itemData?.UID, loadAuthorities]
	);

	const handleFunctionEnabled = useCallback(
		async (moduleId, funcId, enabled) => {
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/ou/user/authorities/${
						enabled ? "enable" : "disable"
					}`,
					bearer: token,
					params: {
						uid: crud.itemData?.UID,
						md: moduleId,
						fn: funcId,
					},
				});
				if (!status.success) {
					throw error || new Error("權限異動異常");
				}
			} catch (err) {
				toast.error(
					Errors.getMessage(`更新 ${moduleId} 權限異常`, err)
				);
			}
		},
		[crud.itemData?.UID, httpPatchAsync, token]
	);

	const handlePatch = useCallback(
		async ({ rowIndex, rowData }) => {
			// console.log(`PATCH [${rowIndex}]`, rowData);
			const ogRowData = authGrid.gridData[rowIndex];
			// console.log(`OG [${rowIndex}]`, ogRowData);
			const moduleId = rowData["JobID"];
			ZA03.FUNCTIONS.forEach((x) => {
				const enabledValue = rowData[x];
				if (enabledValue !== ogRowData[x]) {
					const enabled = enabledValue === "1";
					console.log(`PATCH [${moduleId}][${x}]=>`, enabled);
					handleFunctionEnabled(moduleId, x, enabled);
				}
			});
		},
		[authGrid.gridData, handleFunctionEnabled]
	);

	const handleAuthGridChange = useCallback(
		(newValue, operations) => {
			const operation = operations[0];
			console.log("operation", operation);
			// console.log("newValue", newValue);

			if (operation.type === "UPDATE") {
				const rowIndex = operation.fromRowIndex;
				const rowData = newValue[rowIndex];
				// const row = { rowIndex, rowData };
				// const oldJobId = authGrid.gridData[rowIndex]["JobID"];
				// const newJobId = rowData["JobID"];
				// console.log(`${oldJobId} -> ${newJobId}`);
				// if (
				// 	rowData.module &&
				// 	authGrid.isDuplicating(rowData, newValue)
				// ) {
				// 	authGrid.rewriteRowValue(row, newValue, {
				// 		dept: null,
				// 	});
				// 	toast.error(
				// 		`「${rowData.prod?.ProdData}」已存在, 請選擇其他功能`
				// 	);
				// 	return;
				// }
			}
			authGrid.propagateGridChange(newValue, operations);
		},
		[authGrid]
	);

	const handleCreateRow = useCallback(
		() => ({
			module: null,
			JobID: "",
			INQ: "0",
			INS: "0",
			UPD: "0",
			PRT: "0",
			DEL: "0",
			USI: "0",
			CHK: "0",
			NCK: "0",
			RUN: "0",
			EXP: "0",
			IMP: "0",
		}),
		[]
	);

	const isKeyDisabled = useCallback(
		({ rowData, rowIndex }) => {
			return (
				authGrid.readOnly || authGrid.isPersisted({ rowData, rowIndex })
			);
		},
		[authGrid]
	);

	const getOptionLabel = useCallback((option) => {
		return ZA03.getOptionLabel(option);
	}, []);

	const isOptionEqualToValue = (option, value) => {
		return ZA03.isOptionEqualToValue(option, value);
	};

	const getData = useCallback((data) => {
		return data;
	}, []);

	// 新增權限

	const addAuthAction = useAction();

	// const promptAddAuth = useCallback(() => {
	// 	addAuthAction.prompt();
	// }, [addAuthAction]);

	// const cancelAddAuth = useCallback(() => {
	// 	addAuthAction.clear();
	// }, [addAuthAction]);

	const onAddAuthSubmit = useCallback(
		async (data) => {
			console.log("onAddAuthSubmit", data);
			addAuthAction.start();
			try {
				const { status, error } = await httpPostAsync({
					url: `v1/ou/user/authorities`,
					params: {
						uid: crud.itemData?.UID,
					},
					data: ZA03.transformModulesToIds(data.modules),
					bearer: token,
				});
				if (status.success) {
					reloadAuthorities();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("新增權限失敗", err));
			}

			addAuthAction.finish();
		},
		[
			addAuthAction,
			crud.itemData?.UID,
			httpPostAsync,
			reloadAuthorities,
			token,
		]
	);

	const onAddAuthSubmitError = useCallback(
		(err) => {
			console.error("onAddAuthSubmitError", err);
			addAuthAction.fail();
		},
		[addAuthAction]
	);

	const addAuthDialogOpen = useMemo(() => {
		return (
			addAuthAction.prompting ||
			addAuthAction.working ||
			addAuthAction.failed
		);
	}, [addAuthAction.failed, addAuthAction.prompting, addAuthAction.working]);

	const addAuthWorking = useMemo(() => {
		return addAuthAction.working;
	}, [addAuthAction.working]);

	const handleDelAuth = useCallback(
		async (moduleId) => {
			console.log(`handleDelAuth`);
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/ou/user/authorities`,
					params: {
						uid: crud.itemData?.UID,
						md: moduleId,
					},
					bearer: token,
				});
				if (status.success) {
					reloadAuthorities();
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("刪除權限失敗", err));
			} finally {
				dialogs.closeLatest();
			}
		},
		[crud.itemData?.UID, dialogs, httpDeleteAsync, reloadAuthorities, token]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			authGrid.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要移除 ${rowData.JobID} 所有作業權限?`,
				onConfirm: () => {
					handleDelAuth(rowData.JobID);
				},
				onCancel: () => {
					authGrid.setDeletingRow(null);
					dialogs.closeLatest();
				},
			});
		},
		[authGrid, dialogs, handleDelAuth]
	);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...loader,
		...crud,
		handleSelect,
		// prepaerCreate,
		onSearchSubmit,
		onSearchSubmitError,

		onEditorSubmit,
		onEditorSubmitError,
		// CRUD overrides
		promptCreating,
		confirmDelete,
		...appModule,
		// Dialog
		confirmQuitCreating,
		confirmQuitUpdating,
		handleDialogClose,
		confirmReturnReading,
		// TAB
		selectedTab,
		setSelectedTab,
		handleTabChange,
		// Auth Grid
		getRowKey,
		authGridLoading,
		...authGrid,
		loadAuthorities,
		handleAuthGridChange,
		handleCreateRow,
		handleConfirmDelete,
		isKeyDisabled,
		getOptionLabel,
		isOptionEqualToValue,
		getData,
		handlePatch,
		resetGridLoading: loadAuthAction.clear,
		// Add Authorities
		promptAddAuth: addAuthAction.prompt,
		cancelAddAuth: addAuthAction.clear,
		onAddAuthSubmit,
		onAddAuthSubmitError,
		addAuthDialogOpen,
		addAuthWorking,
	};
};
