import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H43Context } from "./H43Context";
import { useH43 } from "./useH43";
import H43OrderType from "./pickers/H43OrderType.mjs";

export const H43Provider = ({ children }) => {
	const h43 = useH43();
	const form = useForm({
		defaultValues: {
			SArrDate: null,
			EArrDate: null,
			SDeptID: null,
			EDeptID: null,
			orderType: H43OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H43Context.Provider
				value={{
					...h43,
					handleSubmit: form.handleSubmit(
						h43.onSubmit,
						h43.onSubmitError
					),
				}}>
				{children}
			</H43Context.Provider>
		</FormProvider>
	);
};

H43Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








