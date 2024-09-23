import { useB031 } from "../../hooks/jobs/useB031";
import { B031Context } from "./B031Context";
import PropTypes from "prop-types";

export const B031Provider = ({ children }) => {
	const b031 = useB031();

	return (
		<B031Context.Provider
			value={{
				...b031,
			}}>
			{children}
		</B031Context.Provider>
	);
};

B031Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


