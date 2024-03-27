import { useContext } from "react";
import A01ListRow from "./A01ListRow";
import { A01Context } from "@/contexts/A01/A01Context";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const A01ListRowContainer = (props) => {
	const a01 = useContext(A01Context);
	// const { isItemLoading } = a01;
	const { index, ...rest } = props;
	const value = useMemo(() => a01.listData[index], [a01.listData, index]);
	// const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const loading = useMemo(() => !value, [value]);

	const selected = useMemo(() => {
		return value?.ProdID === a01.selectedItem?.ProdID;
	}, [a01.selectedItem?.ProdID, value?.ProdID]);

	return (
		<A01ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => a01.handleSelect(e, value)}
			selected={selected}
			{...rest}
		/>
	);
};
A01ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A01ListRowContainer.displayName = "A01ListRowContainer";
