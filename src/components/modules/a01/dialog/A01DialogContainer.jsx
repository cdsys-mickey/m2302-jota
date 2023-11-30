import { FormProvider, useForm } from "react-hook-form";
import A01Dialog from "./A01Dialog";
import { useContext } from "react";
import { A01Context } from "@/contexts/a01/A01Context";
import { useEffect } from "react";
import { useMemo } from "react";
import ActionState from "../../../../shared-constants/action-state";

export const A01DialogContainer = () => {
	const forms = useForm({
		defaultValues: {},
	});
	const a01 = useContext(A01Context);

	const dataLoaded = useMemo(() => {
		return (
			(a01.readState === ActionState.DONE && !!a01.itemData) ||
			a01.creating
		);
	}, [a01.creating, a01.itemData, a01.readState]);

	const title = useMemo(() => {
		if (a01.creating) {
			return "新增商品";
		} else if (a01.updating) {
			return "修改商品";
		}
		return "商品內容";
	}, [a01.creating, a01.updating]);

	useEffect(() => {
		if (dataLoaded) {
			console.debug(`a01 form reset`);
			forms.reset(a01.itemData);
		}
	}, [a01.itemData, dataLoaded, forms]);

	return (
		<FormProvider {...forms}>
			<form
				onSubmit={forms.handleSubmit(a01.onSubmit, a01.onSubmitError)}>
				<A01Dialog
					title={title}
					open={a01.dialogOpen}
					onClose={a01.confirmDialogClose}
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
