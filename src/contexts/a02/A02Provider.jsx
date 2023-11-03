import useAuth from "@/contexts/useAuth";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { A02Context } from "./A02Context";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";

const A02Provider = (props) => {
	const { children } = props;
	const { httpGetAsync } = useWebApi();
	const { token } = useAuth();
	const { loading, setLoading, handleDataLoaded, handleChange } =
		useContext(DSGContext);

	const load = useCallback(
		async (init) => {
			if (init && loading != null) {
				return;
			}

			setLoading(true);
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/pkg-types",
					bearer: token,
				});
				if (status.success) {
					handleDataLoaded(payload);
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
				setLoading(false);
			}
		},
		[handleDataLoaded, httpGetAsync, loading, setLoading, token]
	);

	const handleBlur = useCallback(({ cell }) => {
		console.debug("cell blurred", cell);
	}, []);

	useEffect(() => {
		load(true);
	}, [load]);

	return (
		<A02Context.Provider
			value={{
				load,
				handleChange,
				handleBlur,
			}}>
			{children}
		</A02Context.Provider>
	);
};

A02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default A02Provider;
