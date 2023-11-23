import { useContext } from "react";
import A01ListRow from "./A01ListRow";
import { A01Context } from "@/contexts/a01/A01Context";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const A01ListRowContainer = (props) => {
	const a01 = useContext(A01Context);
	const { index, data, ...rest } = props;
	const loading = useMemo(() => a01.isItemLoading(index), [a01, index]);
	return (
		<A01ListRow
			index={index}
			loading={loading}
			value={data[index]}
			{...rest}
		/>
	);
};
A01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.array,
};
A01ListRowContainer.displayName = "A01ListRowContainer";
