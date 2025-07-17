import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import CmsBookingOrderGridHeader from "./CmsBookingOrderGridHeader";
import CmsBookingOrderGridRow from "./CmsBookingOrderGridRow";
import CmsBookingOrders from "./CmsBookingOrders";

export const CmsBookingOrderPicker = (props) => {
	const { label = "預約單號", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 100,
		};
		return queryString.stringify(obj);
	}, []);

	return (
		<OptionPicker
			label={label}
			bearer={token}
			url={`v1/cms/bookings`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={CmsBookingOrders.getOptionLabel}
			isOptionEqualToValue={CmsBookingOrders.isOptionEqualToValue}
			renderTagLabel={CmsBookingOrders.renderTagLabel}
			optionLabelSize="md"
			GridHeaderComponent={CmsBookingOrderGridHeader}
			GridRowComponent={CmsBookingOrderGridRow}
			notFoundText="預約單號 ${input} 不存在"
			inputParam="fz"
			clearOnChange
			virtualize
			// disableClose
			{...rest}
		/>
	);
};

CmsBookingOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsBookingOrderPicker.displayName = "DepOrderPicker";
