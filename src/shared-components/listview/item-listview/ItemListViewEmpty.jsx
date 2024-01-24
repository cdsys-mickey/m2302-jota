import React from "react";
import NoDataBox from "../../NoDataBox";

const ItemListViewEmpty = React.forwardRef(({ ...rest }, ref) => {
	return <NoDataBox ref={ref} pt="45%" {...rest} />;
});

export default React.memo(ItemListViewEmpty);
