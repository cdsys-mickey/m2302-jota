import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { G06Context } from "./G06Context";

const G06CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g06 = useContext(G06Context);
		const { moduleAuthorityLoading, canCreate } = g06;
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
				onClick={g06.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
G06CreateButtonContainer.displayName = "G06CreateButtonContainer";
export default G06CreateButtonContainer;

