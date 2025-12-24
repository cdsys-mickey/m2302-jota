import { Paper, styled } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import StdPrint from "../../modules/StdPrint.mjs";
import FlexBoxView from "../../shared-components/ZZFlexBox/FlexBoxView";
import { useScrollable } from "../../shared-hooks/useScrollable";
import StdField from "./StdField";
import { useMemo } from "react";

const ListItem = styled("li")(({ theme }) => ({
	margin: "8px",
	// width: "100%",
	"& .MuiChip-label": {
		flexGrow: 1,
	},
}));

const StdFields = memo((props) => {
	const {
		fields,
		droppableId,
		onDelete,
		height,
		loading = false,
		...rest
	} = props;
	const scrollable = useScrollable({
		height,
		alwaysShowTrack: true,
		alwaysShowThumb: true,
		// trackColor: "transparent"
	});

	const _type = useMemo(() => {
		return StdPrint.droppableIdToType(
			droppableId
		)
	}, [droppableId])

	return (
		<Droppable droppableId={droppableId}>
			{(provided) => (
				<Paper elevation={2} {...rest}>
					<FlexBox fullWidth sx={[scrollable.scroller]}>
						<ul
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{
								listStyle: "none",
								width: "100%",
								padding: "4px 4px 4px 4px",
								margin: 0,
								flexWrap: "wrap",
								// display: "flex",
								// alignItems: "flex-start",
							}}>
							{fields?.map((item, index) => (
								<Draggable
									key={item}
									draggableId={item}
									index={index}>
									{(provided) => (
										<ListItem
											draggableId={item}
											ref={provided.innerRef}>
											<StdField
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												name={item}
												onDelete={() => {
													onDelete(item);
												}}
												type={_type}
											/>
										</ListItem>
									)}
								</Draggable>
							))}

							{provided.placeholder}
						</ul>
					</FlexBox>
				</Paper>
			)}
		</Droppable>
	);
});

StdFields.propTypes = {
	droppableId: PropTypes.string.isRequired,
	fields: PropTypes.array,
	onDelete: PropTypes.func,
	height: PropTypes.number,
	loading: PropTypes.bool,
};

StdFields.displayName = "StdFields";
export default StdFields;
