import { FormProvider, useForm } from "react-hook-form";
import A01Dialog from "./A01Dialog";
import { useContext } from "react";
import { A01Context } from "@/contexts/a01/A01Context";
import { useEffect } from "react";
import { useMemo } from "react";
import ActionState from "../../../../shared-constants/action-state";
import A01 from "../../../../modules/md-a01";

export const A01DialogContainer = () => {
	const forms = useForm({
		defaultValues: {},
	});
	const a01 = useContext(A01Context);

	// const dataLoaded = useMemo(() => {
	// 	return (
	// 		(a01.readState === ActionState.DONE && !!a01.itemData) ||
	// 		a01.createState === ActionState.PROMPT
	// 	);
	// }, [a01.createState, a01.itemData, a01.readState]);
	const dataLoaded = useMemo(() => {
		return (
			(a01.reading && !a01.readWorking && !a01.readFailed) ||
			a01.creating ||
			(a01.updating && !a01.readWorking && !a01.readFailed)
		);
	}, [
		a01.creating,
		a01.readFailed,
		a01.readWorking,
		a01.reading,
		a01.updating,
	]);

	const title = useMemo(() => {
		if (a01.mode === A01.Mode.NEW_PROD) {
			if (a01.creating) {
				return "新增新商品";
			} else if (a01.updating) {
				return "修改新商品";
			} else {
				return "新商品內容";
			}
		} else {
			if (a01.creating) {
				return "新增商品";
			} else if (a01.updating) {
				return "修改商品";
			} else {
				return "商品內容";
			}
		}
	}, [a01.creating, a01.mode, a01.updating]);

	useEffect(() => {
		if (a01.readState === ActionState.DONE && !!a01.itemData) {
			console.debug(`a01 form reset`);
			forms.reset(a01.itemData);
			// a01.resetGridData(a01.itemData);
		}
	}, [a01.itemData, a01.readState, forms]);

	return (
		<FormProvider {...forms}>
			<form
				onSubmit={forms.handleSubmit(a01.onSubmit, a01.onSubmitError)}>
				<A01Dialog
					title={title}
					editing={a01.editing}
					open={a01.dialogOpen}
					onClose={
						a01.editing ? a01.confirmDialogClose : a01.cancelAction
					}
					onReturn={a01.updating ? a01.confirmReturn : null}
					readWorking={a01.readWorking}
					// createState={a01.createState}
					// readState={a01.readState}
					// updateState={a01.updateState}
					// deleteState={a01.deleteState}
					data={a01.itemData}
					dataLoaded={dataLoaded}
				/>
			</form>
		</FormProvider>
	);
};

A01DialogContainer.displayName = "A01DialogContainer";
