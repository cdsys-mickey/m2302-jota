import PropTypes from "prop-types";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";
import { DSGTest4Context } from "./DSGTest4Context";

export const DsgTest4GridProvider = ({ children }) => {
	const dsgTest4 = useContext(DSGTest4Context);

	return (
		<DSGContext.Provider
			value={{
				...dsgTest4.grid,
			}}>
			{children}
		</DSGContext.Provider>
	);
};

DsgTest4GridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
