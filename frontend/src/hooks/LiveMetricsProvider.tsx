import { useLiveMetrics, LiveMetricsContext } from "./liveMetrics";

export function LiveMetricsProvider({ children }: { children: React.ReactNode }) {
    const value = useLiveMetrics();
    return (
        <LiveMetricsContext.Provider value={value}>
            {children}
        </LiveMetricsContext.Provider>
    );
}