import { useP42 } from "@/modules/P42/useP42";
import PropTypes from "prop-types";
import { P42Context } from "./P42Context";

export const P42Provider = ({ children }) => {

	const p42 = useP42();

	return (
		<P42Context.Provider
			value={{
				...p42,
			}}>
			{children}
		</P42Context.Provider>
	);
};

P42Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};




