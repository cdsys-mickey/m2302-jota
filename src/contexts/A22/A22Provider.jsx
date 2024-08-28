import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useA22 } from "../../hooks/jobs/useA22";
import { A22Context } from "./A22Context";

export const A22Provider = (props) => {
	const { children } = props;
	const form = useForm({
		defaultValues: {
			qty: "1",
		},
	});
	const a22 = useA22({ form });

	return (
		<FormProvider {...form}>
			<A22Context.Provider
				value={{
					...a22,
				}}>
				{children}
			</A22Context.Provider>
		</FormProvider>
	);
};

A22Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
