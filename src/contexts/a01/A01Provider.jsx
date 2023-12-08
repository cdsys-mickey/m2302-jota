import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA01 } from "../../hooks/modules/useA01";
import A01 from "../../modules/md-a01";
import { useCrud } from "../../shared-hooks/useCrud";
import { A01Context } from "./A01Context";
import { FormProvider, useForm } from "react-hook-form";

export const A01Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const form = useForm();
	const a01 = useA01({
		token: auth.token,
		mode: A01.Mode.PROD,
		updateParams: true,
	});

	return (
		<A01Context.Provider
			value={{
				...a01,
			}}>
			<FormProvider {...form}>{children}</FormProvider>
		</A01Context.Provider>
	);
};
A01Provider.displayName = "A01Provider";
A01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
