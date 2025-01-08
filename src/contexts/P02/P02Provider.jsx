import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useP02 } from "@/hooks/jobs/useP02";
import P02 from "@/modules/md-p02";
import StdPrint from "@/modules/md-std-print";
import { P02Context } from "./P02Context";

export const P02Provider = ({ children }) => {
	const p02 = useP02();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			RptType: P02.getDataTypeById(P02.DataType.SUMMARY),
		},
	});

	return (
		<FormProvider {...form}>
			<P02Context.Provider
				value={{
					...p02,
					handleSubmit: form.handleSubmit(
						p02.onSubmit,
						p02.onSubmitError
					),
				}}>
				{children}
			</P02Context.Provider>
		</FormProvider>
	);
};

P02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

