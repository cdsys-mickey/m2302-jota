import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C02Context } from "@/contexts/C02/C02Context";

const C02CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c02 = useContext(C02Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={c02.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
C02CreateButtonContainer.displayName = "C02CreateButtonContainer";
export default C02CreateButtonContainer;
