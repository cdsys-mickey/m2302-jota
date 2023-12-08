import { useCallback, useState } from "react";
import { A01Context } from "./A01Context";
import PropTypes from "prop-types";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useCrud } from "../../shared-hooks/useCrud";
import { useAction } from "../../shared-hooks/useAction";
import { useA01 } from "../../hooks/modules/useA01";
import A01 from "../../modules/md-a01";
import { FormProvider, useForm } from "react-hook-form";

export const AA01Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const form = useForm();
	const a01 = useA01({ token: auth.token, mode: A01.Mode.STORE });

	return (
		<A01Context.Provider
			value={{
				...a01,
			}}>
			<FormProvider {...form}>{children}</FormProvider>
		</A01Context.Provider>
	);
};

AA01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
