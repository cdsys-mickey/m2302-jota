import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "@/modules/StdPrint.mjs";
import { U08Context } from "./U08Context";
import U08DataType from "./picker/U08DataType.mjs";
import { useU08 } from "./useU08";

export const U08Provider = ({ children }) => {
	const u08 = useU08();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
			SDeptID: null,
			SDate: new Date(),
			EDate: new Date(),
			RptType: U08DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U08Context.Provider
				value={{
					...u08,
					handleSubmit: form.handleSubmit(
						u08.onSubmit,
						u08.onSubmitError
					),
				}}>
				{children}
			</U08Context.Provider>
		</FormProvider>
	);
};

U08Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





