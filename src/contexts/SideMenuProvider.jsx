import PropTypes from "prop-types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SideMenuContext } from "./SideMenuContext";
import { useSideMenu } from "../hooks/useSideMenu";

export const SideMenuProvider = ({ children, bgcolor }) => {
	const sideMenu = useSideMenu({ bgcolor });
	const form = useForm();

	return (
		<SideMenuContext.Provider
			value={{
				...sideMenu,
			}}>
			<FormProvider {...form}>{children}</FormProvider>
		</SideMenuContext.Provider>
	);
};

SideMenuProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	bgcolor: PropTypes.string,
};
