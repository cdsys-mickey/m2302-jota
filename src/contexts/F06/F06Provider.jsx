import { useF06 } from "@/hooks/jobs/useF06";
import F06 from "@/modules/md-f06";
import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { F06Context } from "./F06Context";

export const F06Provider = ({ children }) => {
	const f06 = useF06();

	const form = useForm({
		defaultValues: {
			PrtType: F06.getDataTypeById(F06.DataType.DIFF),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<F06Context.Provider
				value={{
					...f06,
				}}>
				{children}
			</F06Context.Provider>
		</FormProvider>
	);
};

F06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
