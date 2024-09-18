import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B011Context } from "@/contexts/B011/B011Context";

const B011CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b011 = useContext(B011Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b011.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B011CreateButtonContainer.displayName = "B011CreateButtonContainer";
export default B011CreateButtonContainer;

