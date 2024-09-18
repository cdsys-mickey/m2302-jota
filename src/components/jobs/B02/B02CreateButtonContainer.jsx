import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B02Context } from "@/contexts/B02/B02Context";

const B02CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b02 = useContext(B02Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b02.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B02CreateButtonContainer.displayName = "B02CreateButtonContainer";
export default B02CreateButtonContainer;


