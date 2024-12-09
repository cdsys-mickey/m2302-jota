import { A21Context } from "@/contexts/A21/A21Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useContext, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { AuthContext } from "@/contexts/auth/AuthContext";
import StdPrint from "@/modules/md-std-print";
import A21Form from "./A21Form";

export const A21FormContainer = () => {
	const a21 = useContext(A21Context);
	const form = useFormContext();
	// const { operator } = useContext(AuthContext);
	// const form = useForm({
	// 	defaultValues: {
	// 		dept: {
	// 			DeptID: operator.CurDeptID,
	// 			AbbrName: operator.CurDeptName,
	// 		},
	// 		Name: "Y",
	// 		Tel: "Y",
	// 		InvAddr: "Y",
	// 		ToAddr: "Y",
	// 		SalesID: "Y",
	// 		InvNo: "Y",
	// 		DelyNo: "Y",
	// 		outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
	// 	},
	// });

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			a21.onDebugSubmit,
		)
	}, [a21.onDebugSubmit, form]);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			a21.onSubmit,
			a21.onSubmitError
		)
	}, [a21.onSubmit, a21.onSubmitError, form]);

	return (
		// <FormProvider {...form}>
		<FormMetaProvider {...a21.formMeta}>
			<A21Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
		// </FormProvider>
	);

};

A21FormContainer.displayName = "A21FormContainer";
