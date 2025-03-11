import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { U02Context } from "./U02Context";
import U02DataType from "./picker/U02DataType.mjs";
import { useU02 } from "./useU02";

export const U02Provider = ({ children }) => {
	const u02 = useU02();
	const form = useForm({
		defaultValues: {
			SDeptID: null,
			EDeptID: null,
			SalYM: null,
			SProdID: null,
			EProdID: null,
			InvTx: true,
			SType: false,
			outputType: StdPrint.getDefaultOption(),
			RptType: U02DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U02Context.Provider
				value={{
					...u02,
					handleSubmit: form.handleSubmit(
						u02.onSubmit,
						u02.onSubmitError
					),
				}}>
				{children}
			</U02Context.Provider>
		</FormProvider>
	);
};

U02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



