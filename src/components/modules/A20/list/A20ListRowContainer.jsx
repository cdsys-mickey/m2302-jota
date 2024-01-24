import { useContext } from "react";
import A20ListRow from "./A20ListRow";
import { A20Context } from "@/contexts/A20/A20Context";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const A20ListRowContainer = (props) => {
	const a20 = useContext(A20Context);
	const { isItemLoading } = a20;
	const { index, ...rest } = props;
	const loading = useMemo(() => isItemLoading(index), [index, isItemLoading]);
	const value = useMemo(() => a20.listData[index], [a20.listData, index]);

	const selected = useMemo(() => {
		return value?.ProdID === a20.selectedItem?.ProdID;
	}, [a20.selectedItem?.ProdID, value?.ProdID]);

	return (
		<A20ListRow
			index={index}
			loading={loading}
			value={value}
			onClick={(e) => a20.handleSelect(e, value)}
			selected={selected}
			{...rest}
		/>
	);
};
A20ListRowContainer.propTypes = {
	index: PropTypes.number,
	data: PropTypes.object,
};
A20ListRowContainer.displayName = "A20ListRowContainer";
