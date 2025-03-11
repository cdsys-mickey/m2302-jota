import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { U04Context } from "./U04Context";
import U04DataType from "./picker/U04DataType.mjs";
import { useU04 } from "./useU04";
import U04OrderType from "./picker/U04OrderType.mjs";

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
			OrdName: U04OrderType.getDefaultOption(),
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



