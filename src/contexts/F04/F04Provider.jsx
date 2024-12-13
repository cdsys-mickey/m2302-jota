import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useF04 } from "../../hooks/jobs/useF04";
import StdPrint from "../../modules/md-std-print";
import { F04Context } from "./F04Context";
import F04 from "@/modules/md-f04";

export const F04Provider = ({ children }) => {
	const f04 = useF04();

	const form = useForm({
		defaultValues: {
			PrtType: F04.getDataTypeById(F04.DataType.DIFF),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			PrtID: true
		},
	});

	return (
		<FormProvider {...form}>
			<F04Context.Provider
				value={{
					...f04,
				}}>
				{children}
			</F04Context.Provider>
		</FormProvider>
	);
};

F04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

