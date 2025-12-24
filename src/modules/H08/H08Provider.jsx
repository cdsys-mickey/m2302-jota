import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import OrderDirs from "../OrderDirs.mjs";
import { H08Context } from "./H08Context";
import H08OrderType from "./pickers/H08OrderType.mjs";
import { useH08 } from "./useH08";

export const H08Provider = ({ children }) => {
	const h08 = useH08();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SCustID: null,
			ECustID: null,
			orderType: H08OrderType.getDefaultOption(),
			orderDir: OrderDirs.getOptionById(2),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H08Context.Provider
				value={{
					...h08,
					handleSubmit: form.handleSubmit(
						h08.onSubmit,
						h08.onSubmitError
					),
				}}>
				{children}
			</H08Context.Provider>
		</FormProvider>
	);
};

H08Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





