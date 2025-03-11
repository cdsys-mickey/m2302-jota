import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { U03Context } from "./U03Context";
import U03DataType from "./picker/U03DataType.mjs";
import { useU03 } from "./useU03";

export const U03Provider = ({ children }) => {
	const u03 = useU03();
	const form = useForm({
		defaultValues: {
			SDeptID: null,
			EDeptID: null,
			SDate: null,
			EDate: null,
			catL: null,
			catM: null,
			InvTx: true,
			SType: false,
			outputType: StdPrint.getDefaultOption(),
			RptType: U03DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U03Context.Provider
				value={{
					...u03,
					handleSubmit: form.handleSubmit(
						u03.onSubmit,
						u03.onSubmitError
					),
				}}>
				{children}
			</U03Context.Provider>
		</FormProvider>
	);
};

U03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



