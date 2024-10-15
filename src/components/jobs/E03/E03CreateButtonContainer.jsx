import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { E03Context } from "@/contexts/E03/E03Context";

const E03CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const e03 = useContext(E03Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={e03.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
E03CreateButtonContainer.displayName = "E03CreateButtonContainer";
export default E03CreateButtonContainer;




