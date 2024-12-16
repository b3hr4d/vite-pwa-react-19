import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRegisterSW } from "virtual:pwa-register/react";
import { PWAContext, UPDATE_INTERVAL } from "./pwa-context";

interface PWAProviderProps {
	children: React.ReactNode;
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const updateCheckInProgress = useRef(false);
	const [lastUpdateCheck, setLastUpdateCheck] = useState<Date | null>(null);

	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(registration) {
			if (!registration) {
				toast.error("Registration Failed");
				return;
			}
			checkForUpdates();
		},
		onRegisterError(error) {
			toast.error("Registration Error", {
				description: error.message,
			});
		},
		onNeedRefresh() {
			setNeedRefresh(true);
			toast.info("Update Available", {
				description: "New content is available. Click to update.",
				action: {
					label: "Update",
					onClick: handleUpdate,
				},
				duration: Infinity,
			});
		},
		immediate: false,
	});

	const checkForUpdates = useCallback(async () => {
		if (updateCheckInProgress.current || !("serviceWorker" in navigator))
			return;

		try {
			updateCheckInProgress.current = true;
			setIsUpdating(true);
			const registration = await navigator.serviceWorker.getRegistration();
			if (registration) {
				await registration.update();
				setLastUpdateCheck(new Date());
			}
		} catch (error) {
			toast.error("Update Check Failed", {
				description:
					error instanceof Error ? error.message : "Unknown error occurred",
			});
		} finally {
			updateCheckInProgress.current = false;
			setIsUpdating(false);
		}
	}, []);

	useEffect(() => {
		const interval = setInterval(checkForUpdates, UPDATE_INTERVAL);
		return () => clearInterval(interval);
	}, [checkForUpdates]);

	const handleUpdate = async () => {
		if (isUpdating) return;

		setIsUpdating(true);
		try {
			await updateServiceWorker(true);
			window.location.reload();
		} catch (err) {
			toast.error("Update Failed", {
				description: err instanceof Error ? err.message : "Update failed",
			});
		} finally {
			setIsUpdating(false);
			setNeedRefresh(false);
		}
	};

	const closePrompt = () => {
		setOfflineReady(false);
		setNeedRefresh(false);
	};

	return (
		<PWAContext.Provider
			value={{
				offlineReady,
				needRefresh,
				isUpdating,
				handleUpdate,
				closePrompt,
				checkForUpdates,
				lastUpdateCheck,
			}}
		>
			{children}
		</PWAContext.Provider>
	);
};
