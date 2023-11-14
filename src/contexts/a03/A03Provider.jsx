import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { A03Context } from "./A03Context";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";
import { useState } from "react";
import { DialogContext } from "../../shared-contexts/dialog/DialogContext";
import { useInit } from "@/shared-hooks/useInit";
import { AuthContext } from "@/contexts/auth/AuthContext";

const A03Provider = (props) => {
	const { children } = props;
	return <A03Context.Provider value={{}}>{children}</A03Context.Provider>;
};

A03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default A03Provider;
