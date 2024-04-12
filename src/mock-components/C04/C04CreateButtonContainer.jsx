import AddIcon from "@mui/icons-material/Add";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { forwardRef } from "react";

export const C04CreateButtonContainer = forwardRef(({ ...rest }, ref) => {
	const { handleCreating } = useCrudZZ();

	return (
		<ResponsiveButton
			size="small"
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
