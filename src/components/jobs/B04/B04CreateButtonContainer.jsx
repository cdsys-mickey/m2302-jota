import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B04Context } from "@/contexts/B04/B04Context";

const B04CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b04 = useContext(B04Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b04.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B04CreateButtonContainer.displayName = "B04CreateButtonContainer";
export default B04CreateButtonContainer;



