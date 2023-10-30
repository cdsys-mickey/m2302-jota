import { useCallback, useState } from "react";
import A02Context from "./A02Context";
import PropTypes from "prop-types";
import { useWebApi } from "@/shared-hooks/useWebApi";
import useAuth from "@/contexts/useAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const A02Provider = ({ children }) => {
	const [state, setState] = useState({
		data: [],
		loading: null,
	});

	const { httpGetAsync } = useWebApi();
	const { token } = useAuth();

	const load = useCallback(
		async (init) => {
			if (init && state.loading != null) {
				return;
			}

			setState((prev) => ({
				...prev,
				loading: true,
			}));
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/pkg-types",
					bearer: token,
				});
				if (status.success) {
					setState((prev) => ({
						...prev,
						data: payload,
						loading: false,
					}));
				} else {
					switch (status.code) {
						default:
							toast.error(`發生未預期例外 ${status.code}`);
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				setState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[httpGetAsync, state.loading, token]
	);

	const handleChange = useCallback((newValues, operations) => {
		console.debug("newValues", newValues);
		console.debug("operations", operations);
	}, []);

	useEffect(() => {
		load(true);
	}, [load]);

	return (
		<A02Context.Provider
			value={{
				...state,
				load,
				handleChange,
			}}>
			{children}
		</A02Context.Provider>
	);
};

A02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default A02Provider;
