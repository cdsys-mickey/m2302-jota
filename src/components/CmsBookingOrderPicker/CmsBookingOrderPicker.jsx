import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import CmsBookingOrderGridHeader from "./CmsBookingOrderGridHeader";
import CmsBookingOrderGridRow from "./CmsBookingOrderGridRow";
import CmsBookingOrders from "./CmsBookingOrders";

export const CmsBookingOrderPicker = (props) => {
	const { label = "預約單號", cleared, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const params = {
			tp: 100,
			...(cleared != null && {
				c: cleared ? 1 : 0
			})
		};
		return queryString.stringify(params);
	}, [cleared]);

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
	cleared: PropTypes.bool
};

CmsBookingOrderPicker.displayName = "DepOrderPicker";
