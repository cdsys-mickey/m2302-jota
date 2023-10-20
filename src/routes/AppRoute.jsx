import { Navigate, Route, Routes } from "react-router-dom";

import { CrudProvider } from "@/contexts/crud/CrudProvider";
import MockA01Page from "@/mock-pages/MockA01Page";
import MockC04Page from "@/mock-pages/MockC04Page";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SignInRoute from "@/routes/SignInRoute";
import InfoPage from "@/shared-pages/InfoPage";
import { ProdsProvider } from "@/contexts/prods/ProdsProvider";
import { PurchaseProvider } from "@/contexts/purchase/PurchaseProvider";
import SignIn from "@/pages/auth/SignIn";
import SignInX from "@/pages/auth/SignInX";
import Home from "@/pages/Home";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";

const AppRoute = () => {
	return (
		<Routes>
			{/* Sign In */}
			<Route path="auth" element={<SignInRoute />}>
				<Route index path="signin" element={<SignIn />} />
				<Route path="signinx" element={<SignInX />} />
			</Route>
			<Route path="loading" element={<LoadingFrame />} />
			{/* LADING REDIRECTION */}
			<Route
				path="/"
				element={
					<Navigate to={import.meta.env.VITE_URL_LANDING} replace />
				}
			/>
			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route index path="home" element={<Home />} />

				<Route
					index
					path="A01"
					element={
						<CrudProvider>
							<ProdsProvider>
								<MockA01Page />
							</ProdsProvider>
						</CrudProvider>
					}
				/>
				<Route
					index
					path="C04"
					element={
						<CrudProvider>
							<PurchaseProvider>
								<MockC04Page />
							</PurchaseProvider>
						</CrudProvider>
					}
				/>
			</Route>

			{/* NOT FOUND */}
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
