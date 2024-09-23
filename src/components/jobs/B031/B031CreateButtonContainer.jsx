import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B031Context } from "@/contexts/B031/B031Context";

const B031CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b031 = useContext(B031Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b031.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B031CreateButtonContainer.displayName = "B031CreateButtonContainer";
export default B031CreateButtonContainer;


