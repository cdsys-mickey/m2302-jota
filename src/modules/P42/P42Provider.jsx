import { useP42 } from "@/modules/P42/useP42";
import PropTypes from "prop-types";
import { P42Context } from "./P42Context";
import CmsGroupTypeProvider from "@/components/CmsGroupTypePicker/CmsGroupTypeProvider";

export const P42Provider = ({ children }) => {

	const p42 = useP42();

	return (
		<CmsGroupTypeProvider>
			<P42Context.Provider
				value={{
					...p42,
				}}>
				{children}
			</P42Context.Provider>
		</CmsGroupTypeProvider>
	);
};

P42Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};




