import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

const ZA03CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const za03 = useContext(ZA03Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={za03.promptCreating}
				// onClick={za03.prepaerCreate}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
ZA03CreateButtonContainer.displayName = "ZA03CreateButtonContainer";
export default ZA03CreateButtonContainer;
