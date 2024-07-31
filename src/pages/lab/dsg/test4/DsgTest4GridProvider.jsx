import PropTypes from "prop-types";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import { useContext } from "react";
import { DSGTest4Context } from "./DSGTest4Context";

export const DsgTest4GridProvider = ({ children }) => {
	const dsgTest4 = useContext(DSGTest4Context);

	return (
		<DsgContext.Provider
			value={{
				...dsgTest4.grid,
			}}>
			{children}
		</DsgContext.Provider>
	);
};

DsgTest4GridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
