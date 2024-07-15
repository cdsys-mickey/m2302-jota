import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { D05Context } from "@/contexts/D05/D05Context";

const D05CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const d05 = useContext(D05Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={d05.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
D05CreateButtonContainer.displayName = "D05CreateButtonContainer";
export default D05CreateButtonContainer;

