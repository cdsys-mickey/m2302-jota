import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH03 } from "./useH03";
import StdPrint from "@/modules/StdPrint.mjs";
import { H03Context } from "./H03Context";

export const H03Provider = ({ children }) => {
	const h03 = useH03();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTX: true,
			InclTest: false,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H03Context.Provider
				value={{
					...h03,
					handleSubmit: form.handleSubmit(
						h03.onSubmit,
						h03.onSubmitError
					),
				}}>
				{children}
			</H03Context.Provider>
		</FormProvider>
	);
};

H03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



