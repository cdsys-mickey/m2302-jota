import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useU04 } from "./useU04";
import StdPrint from "../StdPrint.mjs";
import { U04Context } from "./U04Context";
import U04DataType from "./picker/U04DataType.mjs";

export const U04Provider = ({ children }) => {
	const u04 = useU04();
	const form = useForm({
		defaultValues: {
			SDeptID: null,
			EDeptID: null,
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			InvTx: true,
			SType: false,
			outputType: StdPrint.getDefaultOption(),
			RptType: U04DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U04Context.Provider
				value={{
					...u04,
					handleSubmit: form.handleSubmit(
						u04.onSubmit,
						u04.onSubmitError
					),
				}}>
				{children}
			</U04Context.Provider>
		</FormProvider>
	);
};

U04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



