import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { P36Context } from "./P36Context";

const P36CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p36 = useContext(P36Context);
		const { moduleAuthorityLoading, canCreate } = p36;
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (moduleAuthorityLoading || !canCreate) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={p36.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
P36CreateButtonContainer.displayName = "P36CreateButtonContainer";
export default P36CreateButtonContainer;



