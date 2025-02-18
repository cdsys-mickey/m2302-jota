import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import OrderDir from "../OrderDir.mjs";
import { H06Context } from "./H06Context";
import H06OrderType from "./pickers/H06OrderType.mjs";
import { useH06 } from "./useH06";

export const H06Provider = ({ children }) => {
	const h06 = useH06();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SCustID: null,
			ECustID: null,
			InclTest: false,
			orderType: H06OrderType.getDefaultOption(),
			orderDir: OrderDir.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H06Context.Provider
				value={{
					...h06,
					handleSubmit: form.handleSubmit(
						h06.onSubmit,
						h06.onSubmitError
					),
				}}>
				{children}
			</H06Context.Provider>
		</FormProvider>
	);
};

H06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







