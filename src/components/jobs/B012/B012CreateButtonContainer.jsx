import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B012Context } from "@/contexts/B012/B012Context";

const B012CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b012 = useContext(B012Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b012.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B012CreateButtonContainer.displayName = "B012CreateButtonContainer";
export default B012CreateButtonContainer;


