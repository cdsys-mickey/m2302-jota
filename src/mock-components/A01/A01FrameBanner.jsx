import { ProdSearchFormContainer } from "@/components/products/ProdSearchFormContainer";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { forwardRef, memo } from "react";

const A01FrameBanner = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<FrameBanner
				title="貨品基本資料維護作業"
				alt="A01"
				ref={ref}
				SearchFormComponent={ProdSearchFormContainer}
				{...rest}
			/>
		);
	})
);

A01FrameBanner.displayName = "A01FrameBanner";
export default A01FrameBanner;
