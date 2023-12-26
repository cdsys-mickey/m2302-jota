import { AuthContext } from "@/contexts/auth/AuthContext";
import { useCallback, useState } from "react";
import { A01Context } from "../A01/A01Context";
import PropTypes from "prop-types";
import { useA01 } from "../../hooks/modules/useA01";
import { useContext } from "react";
import { useCrud } from "../../shared-hooks/useCrud";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import A01 from "../../modules/md-a01";
import { FormProvider, useForm } from "react-hook-form";

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
