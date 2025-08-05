import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P51Context } from "./P51Context";
import P51ReportType from "./pickers/P51ReportTypes.mjs";
import { useP51 } from "./useP51";

export const P51Provider = ({ children }) => {
	const p51 = useP51();
	const form = useForm({
		defaultValues: {
			SOrdDate: null,
			EOrdDate: null,
			SArrDate: null,
			EArrDate: null,
			STrvID: null,
			ETrvID: null,
			SCarID: null,
			ECarID: null,
			reportType: P51ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			OrdName: "1,4,2,5,6,3"
		},
	});

	return (
		<FormProvider {...form}>
			<P51Context.Provider
				value={{
					...p51,
					handleSubmit: form.handleSubmit(
						p51.onSubmit,
						p51.onSubmitError
					),
				}}>
				{children}
			</P51Context.Provider>
		</FormProvider>
	);
};

P51Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






