import StarIcon from "@mui/icons-material/Star";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useContext } from "react";
import { HomeContext } from "@/contexts/home/HomeContext";
import PropTypes from "prop-types";

export const ReviewWidgetListItemContainer = (props) => {
	const { value } = props;
	const home = useContext(HomeContext);
	const { handleReviewItemClick } = home;

	return (
		<ListItemButton onClick={() => handleReviewItemClick(value)}>
			<ListItemIcon
				sx={{
					minWidth: "36px",
				}}>
				<StarIcon />
			</ListItemIcon>
			<ListItemText
				primary={value.message}
				primaryTypographyProps={{
					variant: "subtitle1",
				}}
			/>
		</ListItemButton>
	);
};
ReviewWidgetListItemContainer.propTypes = {
	value: PropTypes.object,
};
ReviewWidgetListItemContainer.displayName = "ReviewWidgetListItemContainer";
