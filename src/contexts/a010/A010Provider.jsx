import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A01 from "@/modules/A01/A01.mjs";
import { useA01 } from "@/modules/A01/useA01";
import { A01Context } from "@/modules/A01/A01Context";

export const A010Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const form = useForm();
	const a01 = useA01({ token: auth.token, mode: A01.Mode.NEW_PROD });

	return (
		<A01Context.Provider
			value={{
				...a01,
			}}>
			<FormProvider {...form}>{children}</FormProvider>
		</A01Context.Provider>
	);
};

A010Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
