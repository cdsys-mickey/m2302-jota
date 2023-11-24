import { useContext } from "react";
import A01ListRow from "./A01ListRow";
import { A01Context } from "@/contexts/a01/A01Context";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const A01ListRowContainer = (props) => {
	const a01 = useContext(A01Context);
	const { index, ...rest } = props;
	const loading = useMemo(() => a01.isItemLoading(index), [a01, index]);
	const value = a01.data[index];
	// console.debug(`rendering[${loading}] ${index}...`, value);
	return (
		<A01ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => a01.handleViewing(e, value)}
			{...rest}
		/>
	);
};
A01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A01ListRowContainer.displayName = "A01ListRowContainer";
