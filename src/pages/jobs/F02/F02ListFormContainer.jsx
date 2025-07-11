import { F02Context } from "@/pages/jobs/F02/F02Context";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import F02ListForm from "./F02ListForm";

export const F02ListFormContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const { reset } = form;
	const f02 = useContext(F02Context);
	const formMeta = useFormMeta(
		`
		ActDate,
		`
	)

	useInit(() => {
		f02.load();
	}, []);

	useChangeTracking(() => {
		if (f02.itemDataReady) {
			console.log("f02 form reset", f02.itemData);
			reset(f02.itemData);
		}
	}, [f02.itemData, f02.itemDataReady]);

	return (
		<FormMetaProvider {...formMeta}>
			<F02ListForm  {...rest} />
		</FormMetaProvider>
	)
}

F02ListFormContainer.displayName = "F02ListFormContainer";
