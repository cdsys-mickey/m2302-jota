import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { U01Context } from "./U01Context";
import U01DataType from "./pickers/U01DataType.mjs";
import { useU01 } from "./useU01";
import U01OrderType from "./pickers/U01OrderType.mjs";

export const U01Provider = ({ children }) => {
	const u01 = useU01();
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
			RptType: U01DataType.getDefaultOption(),
			orderType: U01OrderType.getDefaultOption()
		},
	});

	return (
		<FormProvider {...form}>
			<U01Context.Provider
				value={{
					...u01,
					handleSubmit: form.handleSubmit(
						u01.onSubmit,
						u01.onSubmitError
					),
				}}>
				{children}
			</U01Context.Provider>
		</FormProvider>
	);
};

U01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


