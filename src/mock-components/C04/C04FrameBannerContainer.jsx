import PurchaseOrderSearchFormContainer from "@/components/purchase-orders/PurchaseOrderSearchFormContainer";
import React from "react";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { forwardRef } from "react";

const C04FrameBannerContainer = forwardRef((props, ref) => {
	const { ...rest } = props;

	return (
		<FrameBanner
			title="進貨單輸入作業"
			alt="C04"
			ref={ref}
			SearchFormComponent={PurchaseOrderSearchFormContainer}
			{...rest}
		/>
	);
});

C04FrameBannerContainer.displayName = "C04FrameBannerContainer";
export default C04FrameBannerContainer;
