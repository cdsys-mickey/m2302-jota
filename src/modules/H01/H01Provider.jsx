import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH01 } from "./useH01";
import StdPrint from "../StdPrint.mjs";
import { H01Context } from "./H01Context";
import H01OrderType from "./pickers/H01OrderType.mjs";

export const H01Provider = ({ children }) => {
	const h01 = useH01();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTX: true,
			InclTest: false,
			orderType: H01OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H01Context.Provider
				value={{
					...h01,
					handleSubmit: form.handleSubmit(
						h01.onSubmit,
						h01.onSubmitError
					),
				}}>
				{children}
			</H01Context.Provider>
		</FormProvider>
	);
};

H01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


