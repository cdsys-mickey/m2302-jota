import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H27Context } from "./H27Context";
import { useH27 } from "./useH27";
import H27OrderType from "./pickers/H27OrderType.mjs";

export const H27Provider = ({ children }) => {
	const h27 = useH27();
	const form = useForm({
		defaultValues: {
			SArrDate: null,
			EArrDate: null,
			SDeptID: null,
			EDeptID: null,
			orderType: H27OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H27Context.Provider
				value={{
					...h27,
					handleSubmit: form.handleSubmit(
						h27.onSubmit,
						h27.onSubmitError
					),
				}}>
				{children}
			</H27Context.Provider>
		</FormProvider>
	);
};

H27Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







