import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { A06Context } from "../../../contexts/A06/A06Context";

const A06CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a06 = useContext(A06Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={a06.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A06CreateButtonContainer.displayName = "A06CreateButtonContainer";
export default A06CreateButtonContainer;
