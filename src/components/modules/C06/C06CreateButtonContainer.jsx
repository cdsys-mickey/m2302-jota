import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C06Context } from "@/contexts/C06/C06Context";

const C06CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c06 = useContext(C06Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c06.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C06CreateButtonContainer.displayName = "C06CreateButtonContainer";
export default C06CreateButtonContainer;
