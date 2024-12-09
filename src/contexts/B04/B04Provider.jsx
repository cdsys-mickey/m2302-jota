import { useB02 } from "@/hooks/jobs/useB02";
import { useB04 } from "../../hooks/jobs/ZZuseB04";
import { B04Context } from "./B04Context";
import PropTypes from "prop-types";

export const B04Provider = ({ children }) => {
	const b04 = useB02({ forNew: true });

	return (
		<B04Context.Provider
			value={{
				...b04,
			}}>
			{children}
		</B04Context.Provider>
	);
};

B04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



