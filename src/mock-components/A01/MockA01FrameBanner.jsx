import { ProdSearchFormContainer } from "@/components/products/ProdSearchFormContainer";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { forwardRef, memo } from "react";

const MockA01FrameBanner = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<FrameBanner
				title="貨品基本資料維護作業"
				alt="A01"
				ref={ref}
				{...rest}>
				{ProdSearchFormContainer}
			</FrameBanner>
		);
	})
);

MockA01FrameBanner.displayName = "MockA01FrameBanner";
export default MockA01FrameBanner;
