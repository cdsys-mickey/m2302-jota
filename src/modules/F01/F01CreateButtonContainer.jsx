import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { F01Context } from "@/modules/F01/F01Context";

const F01CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f01 = useContext(F01Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={f01.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
F01CreateButtonContainer.displayName = "F01CreateButtonContainer";
export default F01CreateButtonContainer;

