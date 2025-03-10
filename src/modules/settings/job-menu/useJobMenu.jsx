import { AuthContext } from "@/contexts/auth/AuthContext";
import { useCallback, useContext, useMemo, useState } from "react";
import { useAction } from "@/shared-hooks/useAction";
import { useWebApi } from "@/shared-hooks/useWebApi";
import JobMenu from "./JobMenu.mjs";
import { nanoid } from "nanoid";
import { toastEx } from "@/helpers/toast-ex";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import SideMenu from "@/modules/SideMenu.mjs";

export const useJobMenu = () => {
	const { httpGetAsync, httpPutAsync } = useWebApi();

	const auth = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const { operator, token } = auth;

	const [state, setState] = useState({
		displayName: null,
		fields: null,
		fieldsLoading: null,
		fieldsError: null,
		selectedFields: null,
		menuLoading: false
	});

	const printAction = useAction();
	const printing = useMemo(() => {
		return !!printAction.state;
	}, [printAction.state]);

	const promptPrint = useCallback(() => {
		printAction.prompt();
	}, [printAction]);

	const cancelPrint = useCallback(() => {
		printAction.clear();
	}, [printAction]);

	const loadActiveItems = useCallback(async (items) => {
		setState(prev => ({
			...prev,
			menuLoading: true
		}))
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/user/settings/menu`,
				bearer: token
			})
			if (status.success) {
				const sortedPayload = payload
					.map(id => {
						if (id.startsWith("@")) {
							return {
								id: nanoid(),
								JobName: id.slice(1),
							}
						}

						const item = items.find(item => item.JobID === id);
						return item ? { ...item, id: nanoid() } : null;
					})
					.filter(Boolean);
				setState(prev => ({
					...prev,
					selectedFields: sortedPayload,
					menuLoading: false
				}))
			} else {
				throw error || new Error("未預期例外")
			}
		} catch (err) {
			console.error(err);
			if (err.status == 404) {
				toastEx.info("您尚未設定功能排序，建議您可以先「加入所有功能」後，再請依需求調整");
			} else {
				toastEx.error("載入個人設定發生錯誤");
			}
		} finally {
			setState(prev => ({
				...prev,
				menuLoading: false
			}))
		}
	}, [httpGetAsync, token]);

	const loadDef = useCallback(async () => {
		setState((prev) => ({
			...prev,
			fieldsLoading: true,
			fields: []
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/auth/authorities`,
				bearer: token,
			});
			if (status.success) {
				const authItems = payload.map(x => ({
					...x,
					id: nanoid()
				})) || [];
				setState((prev) => ({
					...prev,
					// fields: payload.map((x) => x.JobID) || [],
					fields: authItems,
					selectedFields: [],
				}));
				loadActiveItems(authItems)
			} else {
				throw error || new Error("讀取欄位發生例外");
			}
		} catch (err) {
			setState((prev) => ({
				...prev,
				fieldsError: err,
			}));
		} finally {
			setState((prev) => ({
				...prev,
				fieldsLoading: false,
			}));
		}
	}, [httpGetAsync, loadActiveItems, token]);

	const handleDragEnd = useCallback(
		(dragResult) => {
			console.log("handleDragEnd", dragResult);
			const { source, destination } = dragResult;
			if (!destination) {
				return;
			}

			if (
				destination.droppableId === JobMenu.SELECTED
				&& source.droppableId === JobMenu.UNUSED
			) {
				const fromIndex = source.index;
				const toIndex = destination.index;

				// remove from source
				const fromItems = state.fields;
				const toItems = state.selectedFields;
				const item = {
					...fromItems[fromIndex],
					id: nanoid(),
				};
				toItems.splice(toIndex, 0, item);

				setState((prev) => ({
					...prev,
					selectedFields:
						toItems,
				}));
			}

			if (destination.droppableId === JobMenu.SELECTED
				&& source.droppableId === JobMenu.SELECTED) {
				// 調整排序
				const fromIndex = source.index;
				const toIndex = destination.index;
				if (fromIndex === toIndex) {
					return;
				}
				const values = state.selectedFields;
				const [removed] = values.splice(fromIndex, 1);
				values.splice(toIndex, 0, removed);
				setState((prev) => ({
					...prev,
					selectedFields: values,
				}));
			}
		},
		[state.fields, state.selectedFields]
	);

	const handleDelete = useCallback((item) => {
		console.log("handleDelete", item);
		setState((prev) => ({
			...prev,
			// fields: [...prev.fields, f],
			selectedFields: [...prev.selectedFields.filter((x) => x.id !== item.id)],
		}));
	}, []);

	const handleRefreshPrompt = useCallback(() => {
		dialogs.confirm({
			message: "功能排序已儲存, 是否要立即生效?",
			onConfirm: () => {
				auth.loadModules({ token });
			},
			onCancel: () => {
				toastEx.warn("功能排序於重新登入後生效");
			}
		})
	}, [auth, dialogs, token]);

	const handleHeaderEdit = useCallback((item) => {
		console.log("handleHeaderEdit", item)
		dialogs.prompt({
			title: "重新命名",
			message: `請為群組標頭重新命名`,
			defaultPromptValue: item.JobName,
			onConfirm: ({ value }) => {
				if (value) {
					setState((prev) => ({
						...prev,
						selectedFields: prev.selectedFields.map((field) =>
							field.id === item.id ? { ...field, JobName: value } : field
						),
					}));
				}
			}
		})
	}, [dialogs]);

	const handleAdd = useCallback((f) => {
		console.log("handleAdd", f);
		const isHeader = SideMenu.isHeader(f);
		if (isHeader) {
			const fieldsToAdd = [];
			let add = false;
			let added = false;

			setState((prev) => {
				const fields = prev.fields;

				for (let i = 0; i < fields.length; i++) {
					const field = fields[i];
					if (field.JobID === f.JobID) {
						add = true;  // 開始加入 fields
					}
					if (add) {
						if (added && SideMenu.isHeader(field)) {
							break;
						}
						fieldsToAdd.push({ ...field, id: nanoid() });
						added = true;
					}
				}

				return {
					...prev,
					selectedFields: [...prev.selectedFields, ...fieldsToAdd],
				};
			});
		} else {
			setState((prev) => ({
				...prev,
				// fields: [...prev.fields.filter((x) => x !== f)],
				selectedFields: [...prev.selectedFields, {
					...f,
					id: nanoid()
				}],
			}));
		}
	}, []);


	const handleAddAllFields = useCallback(() => {
		setState((prev) => ({
			...prev,
			// fields: [],
			selectedFields: prev.fields.map(x => ({
				...x,
				id: nanoid()
			})),
		}));
	}, []);

	const handleRemoveAllFields = useCallback(() => {
		setState((prev) => ({
			...prev,
			fields: [...prev.fields],
			// fields: [...prev.selectedFields, ...prev.fields],
			selectedFields: [],
		}));
	}, []);

	const handleReset = useCallback(() => {
		loadDef();
	}, [loadDef]);

	const onSubmitError = useCallback((err) => {
		console.error(`onSubmitError`, err);
	}, []);


	const saveAction = useAction();



	const handleSave = useCallback(async () => {
		const collected = state.selectedFields?.map(x => {
			if (!x.JobID && !x.JobName) {
				return null;
			}
			if (x.JobName && !x.JobID) {
				return `@${x.JobName}`;
			}
			return x.JobID;
		}).filter(Boolean) || [];
		console.log("selectedFields", collected);

		try {
			saveAction.start();
			const { status, error } = await httpPutAsync({
				url: "v1/user/settings/menu",
				bearer: token,
				data: collected
			})
			if (status.success) {
				handleRefreshPrompt();
				saveAction.finish();
			} else {
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			saveAction.fail({
				error: err
			});
			console.error("handleSave", err);
			toastEx.error("儲存失敗", err);
		}

	}, [handleRefreshPrompt, httpPutAsync, saveAction, state.selectedFields, token]);

	const handleAddGroup = useCallback(() => {
		dialogs.prompt({
			title: "新稱群組標頭",
			message: "請輸入群組名稱",
			onConfirm: ({ value }) => {
				setState(prev => ({
					...prev,
					selectedFields: [
						...prev.selectedFields,
						{
							id: nanoid(),
							JobName: value
						}
					]
				}))
			}
		})
	}, [dialogs]);

	// useInit(() => {
	// 	load();
	// }, []);

	return {
		...state,
		loadDef,
		handleDragEnd,
		handleDelete,
		handleAdd,
		printing,
		promptPrint,
		cancelPrint,
		handleAddAllFields,
		handleRemoveAllFields,
		handleReset,
		onSubmitError,
		handleSave,
		saveWorking: saveAction.working,
		handleAddGroup,
		handleHeaderEdit
	};
};
