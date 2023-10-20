import React, { useState } from "react";
import AccordionEx from "../../shared-components/accordion-ex/AccordionEx";
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import AccordionDetailsEx from "@/shared-components/accordion-ex/AccordionDetailsEx";
import AccordionSummaryEx from "@/shared-components/accordion-ex/AccordionSummaryEx";
import FlexBox from "@/shared-components/FlexBox";
import useScrollable from "@/shared-hooks/useScrollable";

const SideMenu = React.forwardRef((props, ref) => {
	const {
		height,
		// Menu
		menus = [],
		handleItemClick,
		selectedItem,
		// Accordion
		expanded,
		handleAccordionChange,
		...rest
	} = props;

	const scrollable = useScrollable({
		height,
	});

	return (
		<Box ref={ref} sx={[scrollable.scroller]} {...rest}>
			<Box sx={[scrollable.body]}>
				{Object.keys(menus).map((s) => (
					<AccordionEx
						key={s}
						expanded={expanded.includes(s)}
						onChange={handleAccordionChange(s)}>
						<AccordionSummaryEx
							aria-controls="panel1d-content"
							id="panel1d-header">
							<FlexBox inline>
								<FlexBox mr={1} alignItems="center">
									{menus[s].icon}
								</FlexBox>

								<Typography
									variant="subtitle1"
									color="text.secondary"
									sx={
										{
											// fontWeight: 600,
										}
									}>
									{/* {s} */}
									{menus[s].name}
								</Typography>
							</FlexBox>
						</AccordionSummaryEx>
						<AccordionDetailsEx>
							<FlexBox py={1}>
								<List
									dense
									disablePadding
									sx={{ width: "100%" }}>
									{menus[s].items.map((i) => (
										<ListItem
											dense
											disablePadding
											key={i.id}>
											<ListItemButton
												selected={selectedItem === i.id}
												onClick={handleItemClick(i.id)}>
												<FlexBox
													inline
													alignItems="flex-start">
													<FlexBox
														pt="5px"
														sx={{
															width: "3rem",
														}}>
														<Typography variant="body2">
															{i.id}
														</Typography>
													</FlexBox>
													<FlexBox flex={1}>
														<ListItemText
															primary={`${i.name}`}
														/>
													</FlexBox>
												</FlexBox>
											</ListItemButton>
										</ListItem>
									))}
								</List>
							</FlexBox>
						</AccordionDetailsEx>
					</AccordionEx>
				))}
			</Box>
		</Box>
	);
});

export default React.memo(SideMenu);
