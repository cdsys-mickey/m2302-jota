import { useA01 } from "@/hooks/jobs/useA01";
import A01 from "@/modules/A01.mjs";
import PropTypes from "prop-types";
import { A01Context } from "./A01Context";

export const A01Provider = ({ children }) => {
	const a01 = useA01({
		mode: A01.Mode.PROD,
	});

	return (
		<A01Context.Provider
			value={{
				...a01,
			}}>
			{children}
		</A01Context.Provider>
	);
};
A01Provider.displayName = "A01Provider";
A01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
