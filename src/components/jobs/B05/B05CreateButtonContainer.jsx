import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B05Context } from "@/contexts/B05/B05Context";

const B05CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b05 = useContext(B05Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b05.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B05CreateButtonContainer.displayName = "B05CreateButtonContainer";
export default B05CreateButtonContainer;
