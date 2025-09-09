import { Route, Routes } from "react-router-dom";

import HomeContainer from "@/pages/home/HomeContainer";
import ProtectedRoute from "@/routes/ProtectedRoute";
import InfoPage from "@/shared-pages/InfoPage";



import { HomeProvider } from "@/contexts/home/HomeProvider";
import { MessagesProvider } from "@/contexts/msgs/MesssagesProvider";
import { SettingsProvider } from "@/modules/settings/SettingsProvider";



import { SettingsFrameContainer } from "@/modules/settings/SettingsFrameContainer";
import { RenewFrameContainer } from "@/pages/auth/RenewFrameContainer";
import { MessagesFrameContainer } from "@/pages/messages/MessagesFrameContainer";
import { InfiniteLoaderProvider } from "../contexts/infinite-loader/InfiniteLoaderProvider";


import ForbiddenPageContainer from "@/pages/ForbiddenPageContainer";
import CheckAuthRoute from "./CheckAuthRoute";
import aRoutes from "./aRoutes";
import authRoutes from "./authRoutes";
import bRoutes from "./bRoutes";
import cRoutes from "./cRoutes";
import dRoutes from "./dRoutes";
import eRoutes from "./eRoutes";
import fRoutes from "./fRoutes";
import gRoutes from "./gRoutes";
import hRoutes from "./hRoutes";
import hRoutes2 from "./hRoutes2";
import labRoutes from "./labRoutes";
import pRoutes from "./pRoutes";
import pRoutes2 from "./pRoutes2";
import sysRoutes from "./sysRoutes";
import uRoutes from "./uRoutes";

const AppRoute = () => {
	return (
		<Routes>

			{/* LANDING REDIRECTION */}
			<Route
				index
				element={
					// <Navigate to={import.meta.env.VITE_URL_LANDING} replace />
					<CheckAuthRoute />
				}
			/>

			{authRoutes}

			{labRoutes}

			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route
					path="home"
					element={
						<HomeProvider>
							<HomeContainer />
						</HomeProvider>
					}
				/>
				<Route
					path="msgs"
					element={
						<InfiniteLoaderProvider>
							<MessagesProvider>
								<MessagesFrameContainer />
							</MessagesProvider>
						</InfiniteLoaderProvider>
					}
				/>
				<Route path="renew" element={<RenewFrameContainer />} />
				<Route
					path="settings"
					element={
						<SettingsProvider>
							<SettingsFrameContainer />
						</SettingsProvider>
					}
				/>

				<Route path="modules">
					{aRoutes}
					{bRoutes}
					{cRoutes}
					{dRoutes}
					{eRoutes}
					{fRoutes}
					{gRoutes}
					{hRoutes}
					{hRoutes2}
					{pRoutes}
					{pRoutes2}
					{uRoutes}
					{sysRoutes}

					{/* MODULE NOT FOUND */}
					<Route
						path="*"
						element={
							<InfoPage
								severity="warning"
								alertProps={
									{
										// maxWidth:
									}
								}
								title="找不到您要瀏覽的模組"
								message="請聯絡系統管理員"
							/>
						}
					/>
				</Route>
			</Route>
			<Route
				path="forbidden"
				element={
					<ForbiddenPageContainer />
				}
			/>
			{/* PUBLIC PAGE NOT FOUND */}
			<Route
				path="*"
				element={
					<InfoPage
						severity="warning"
						alertProps={
							{
								// maxWidth:
							}
						}
						title="找不到您要瀏覽的頁面"
						message="請聯絡系統管理員"
					/>
				}
			/>

		</Routes>
	);
};

export default AppRoute;
