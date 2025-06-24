// import CabinetTypes from "@/modules/md-cabinet-types";
import { ButtonEx } from "@/shared-components";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider } from "@mui/material";
import { forwardRef, memo } from "react";
import A06SearchForm from "./A06SearchForm";

const A06SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			onReset,
			// onReset,
			ContentProps,
			...rest
		} = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階篩選</PopperTitle>
				<Divider sx={{ mt: 0, mb: 0 }} />
				<DialogContent {...ContentProps}>
					<A06SearchForm initSize="xs" spacing={2} />
				</DialogContent>
				<Divider />
				<DialogActions>

					<ButtonEx
						size="small"
						variant="outlined"
						color="primary"
						onClick={onReset}>
						清除
					</ButtonEx>
					<ButtonEx
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
					// onClick={handleSubmit}
					>
						篩選
					</ButtonEx>
				</DialogActions>
			</PopperBox>
		);
	})
);

A06SearchPopper.displayName = "A06SearchPopper";

export default A06SearchPopper;
