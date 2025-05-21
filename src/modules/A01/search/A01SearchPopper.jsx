// import CabinetTypes from "@/modules/md-cabinet-types";

import ButtonWrapper from "@/shared-components/ButtonWrapper";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import MuiStyles from "@/shared-modules/MuiStyles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import A01SearchForm from "./A01SearchForm";
const A01SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			// width = "40ch",
			width,
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
					<A01SearchForm initSize="sm" />
				</DialogContent>
				<Divider />
				<DialogActions>
					{/* <ButtonEx
						size="small"
						variant="contained"
						color="inherit"
						onClick={onReset}>
						清除
					</ButtonEx> */}
					<ButtonWrapper
						size="small"
						variant="outlined"
						color="primary"
						onClick={onReset}>
						清除
					</ButtonWrapper>
					<ButtonWrapper
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
					// onClick={handleSubmit}
					>
						篩選
					</ButtonWrapper>
				</DialogActions>
			</PopperBox>
		);
	})
);

A01SearchPopper.displayName = "A01SearchPopper";

export default A01SearchPopper;
