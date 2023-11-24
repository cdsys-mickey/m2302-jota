import AddIcon from "@mui/icons-material/Add";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";

export const C04CreateButtonContainer = React.forwardRef(({ ...rest }, ref) => {
	const { handleCreating } = useCrudZZ();

	return (
		<ResponsiveButton
			ref={ref}
			variant="contained"
			startIcon={<AddIcon />}
			onClick={handleCreating}
			sx={{
				fontWeight: 600,
			}}>
			新增
		</ResponsiveButton>
	);
});
