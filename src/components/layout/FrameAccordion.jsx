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
import { useScrollable } from "@/shared-hooks/useScrollable";
import { memo } from "react";
import { forwardRef } from "react";
import FrameMenuItemButton from "./FrameMenuItemButton";
import { FrameMenuGroupHeader } from "./FrameMenuGroupHeader";

const FrameAccordion = memo(
	forwardRef((props, ref) => {
		const {
			height,
			// Menu
			menus = [],
			handleItemClickBy,
			selectedItem,
			// Accordion
			expanded,
			handleAccordionChange,
		} = props;

		const scrollable = useScrollable({
			height,
		});

		return (
			<Box ref={ref} sx={[scrollable.scroller]}>
				<Box sx={[scrollable.body]}>
					{Object.keys(menus).map((s) => (
						<AccordionEx
							key={s}
							expanded={expanded.includes(s)}
							onChange={handleAccordionChange(s)}>
							{/* 選單頭 */}
							<AccordionSummaryEx
								aria-controls="panel1d-content"
								id="panel1d-header">
								<FrameMenuGroupHeader
									icon={menus[s].icon}
									text={menus[s].name}
								/>
							</AccordionSummaryEx>
							{/* 選單項目容器 */}
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
												<FrameMenuItemButton
													selected={
														selectedItem === i.id
													}
													onClick={handleItemClickBy(
														i.id
													)}
													code={i.id}
													primary={`${i.name}`}
												/>
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
	})
);

export default FrameAccordion;
