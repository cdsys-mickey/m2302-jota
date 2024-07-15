import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C05Context } from "@/contexts/C05/C05Context";

const C05CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c05 = useContext(C05Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c05.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C05CreateButtonContainer.displayName = "C05CreateButtonContainer";
export default C05CreateButtonContainer;
