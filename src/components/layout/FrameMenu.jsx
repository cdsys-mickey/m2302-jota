import { forwardRef, memo } from "react";
import useScrollable from "@/shared-hooks/useScrollable";
import { Box, List, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import FrameMenuItemButton from "./FrameMenuItemButton";
import LoadingTypography from "@/shared-components/LoadingTypography";
import ErrorBox from "@/shared-components/ErrorBox";

const FrameMenu = memo(
	forwardRef((props, ref) => {
		const { height, authorities, authoritiesLoading, authoritiesError } =
			props;

		const scrollable = useScrollable({
			height,
		});

		if (authoritiesLoading) {
			return <LoadingTypography>讀取中...</LoadingTypography>;
		}

		if (authoritiesError) {
			return <ErrorBox error={authoritiesError} />;
		}

		return (
			<Box ref={ref} sx={[scrollable.scroller]} py={1}>
				<Box sx={[scrollable.body]}>
					<List dense disablePadding sx={{ width: "100%" }}>
						{authorities &&
							authorities.map((a) => (
								<ListItem key={a.JobID} dense disablePadding>
									<FrameMenuItemButton
										code={a.JobID}
										primary={a.JobName}
									/>
								</ListItem>
							))}
					</List>
				</Box>
			</Box>
		);
	})
);

FrameMenu.propTypes = {
	height: PropTypes.number,
	authorities: PropTypes.array,
	authoritiesLoading: PropTypes.bool,
	authoritiesError: PropTypes.object,
};

FrameMenu.displayName = "FrameMenu";

export default FrameMenu;
