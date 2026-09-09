import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import OrderDirs from "../OrderDirs.mjs";
import { H07AContext } from "./H07AContext";
import { useH07A } from "./useH07A";

export const H07AProvider = ({ children }) => {
	const h07a = useH07A();
	const form = useForm({
		defaultValues: {
			SDate1: null,
			EDate1: null,
			SDate2: null,
			EDate2: null,
			SalType: null,
			orderDir: OrderDirs.getOptionById(2),
			// calType: H07ACalType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			employee: []
		},
	});

	return (
		<FormProvider {...form}>
			<H07AContext.Provider
				value={{
					...h07a,
					handleSubmit: form.handleSubmit(
						h07a.onSubmit,
						h07a.onSubmitError
					),
				}}>
				{children}
			</H07AContext.Provider>
		</FormProvider>
	);
};

H07AProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






