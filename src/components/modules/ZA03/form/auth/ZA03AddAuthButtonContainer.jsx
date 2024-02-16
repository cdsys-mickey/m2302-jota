import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

const ZA03AddAuthButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const za03 = useContext(ZA03Context);
		const text = useMemo(() => {
			return "新增作業權限";
		}, []);

		if (za03.readOnly) {
			return false;
		}
		return (
			<ResponsiveButton
				ref={ref}
				// variant="contained"
				startIcon={<AddIcon />}
				onClick={za03.promptAddAuth}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
ZA03AddAuthButtonContainer.displayName = "ZA03AddAuthButtonContainer";
export default ZA03AddAuthButtonContainer;
