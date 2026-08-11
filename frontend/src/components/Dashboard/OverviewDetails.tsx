import { Stack, Box, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import type { ReactNode } from 'react';


import { BrandColors, TextColors } from '../../assets/themes/colors';

import { useLiveMetrics } from '../../hooks/liveMetrics';
import type { APIStatus } from '../../hooks/liveMetrics';

const DEFAULT_POSITION = { x: 20, y: 20 } //CAN BE ADJUSTED

const NA = 'N/A';

const API_STATUS_CONFIG: Record<APIStatus, { label: string; color: string }> = {
    healthy: { label: 'Healthy', color: BrandColors.MainPrimary },
    degraded: { label: 'Degraded', color: '#E0A800' },
    offline: { label: 'Offline', color: '#C0392B' },
}

function StatusDot({ color }: { color: string }) {
    return (
        <Box sx={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: color,
            flexShrink: 0,
        }} />
    )
}

function display(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return NA;
    return String(value);
}

function MetricRow({ label, value, valueColor }: { label: string; value: ReactNode; valueColor?: string }) {
    const isNA = value === NA;

    return (
        <Stack direction='row' sx={{
            justifyContent: 'space-between',
            width: '100%',
        }}>
            <Typography sx={{
                fontSize: '13px',
                color: TextColors.OverviewContent
            }}>
                {label}
            </Typography>
            <Typography sx={{
                fontSize: '15px',
                fontWeight: 600,
                color: isNA ? TextColors.DarkThemeGray : (valueColor ?? TextColors.DarkThemeText)
            }}>
                {value}
            </Typography>
        </Stack>
    );
}

export const OverviewDetails = () => {
    const theme = useTheme();

    const { metrics } = useLiveMetrics();

    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem('overviewDetailsPosition');
        return saved ? JSON.parse(saved) : DEFAULT_POSITION;
    });

    useEffect(() => {
        localStorage.setItem('overviewDetailsPosition', JSON.stringify(position));
    }, [position]);

    const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: position.x,
            originY: position.y,
        };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;

        const panelHeight = panelRef.current?.offsetHeight ?? 120;
        const maxX = window.innerWidth - 360; // 360 - panel width
        const maxY = Math.max(window.innerHeight - panelHeight, 0);

        setPosition({
            x: Math.min(Math.max(dragRef.current.originX + dx, 0), maxX),
            y: Math.min(Math.max(dragRef.current.originY + dy, 0), maxY),
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        dragRef.current = null;
    };

    return (
        <Stack
            ref={panelRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            sx={{
                position: 'fixed',
                top: `${position.y}px`,
                left: `${position.x}px`,
                zIndex: 900,

                gap: '16px',
                width: '360px',
                padding: '22px 24px',
                borderRadius: '18px',
                boxShadow: '0px 10px 24px 0px rgba(0,0,0,0.25)',

                borderTop: '3.5px solid transparent',
                borderLeft: '3.5px solid transparent',
                borderRight: '3.5px solid transparent',
                borderBottom: '3.5px solid transparent',
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.8), rgba(32, 32, 32, 0.8)), ${theme.custom.navBorderGradient}`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                transition: 'background-color 0.5s ease, color 0.5s ease',

                userSelect: 'none',
                touchAction: 'none',
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' }
            }}>
            <Stack
                direction='row'
            >
                <Typography sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: TextColors.DarkThemeText,
                }}>
                    LIVE ROUTING OVERVIEW
                </Typography>
            </Stack>

            <MetricRow
                label="Active Region"
                value={display(metrics.activeRegion)}
                valueColor={BrandColors.MainPrimary}
            />
            <MetricRow
                label="Carbon Emissions Saved"
                value={display(metrics.carbonSavedKg !== null ? `${metrics.carbonSavedKg.toFixed(1)} kg CO2` : NA)}
            />
            <MetricRow
                label="Savings Multiplier"
                value={display(metrics.savingsMultiplier !== null ? `${metrics.savingsMultiplier.toFixed(1)}` : NA)}
            />
            {metrics.apiHealth === null ? (
                <MetricRow label="API Connection" value={NA} valueColor={TextColors.DarkThemeGray} />
            ) : (
                <MetricRow
                    label='API Connection'
                    value={
                        <Stack direction='row' 
                        sx={{
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        >
                            <StatusDot color={API_STATUS_CONFIG[metrics.apiHealth].color} />
                            {API_STATUS_CONFIG[metrics.apiHealth].label}
                        </Stack>
                    }
                    valueColor={API_STATUS_CONFIG[metrics.apiHealth].color}
                />
            )
            }

            <MetricRow
                label="Last updated"
                value={display(metrics.lastUpdate)}
                valueColor={TextColors.OverviewContent}
            />

            <Box sx={{
                height: '1px',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.15)'
            }} />

            <Typography sx={{
                fontSize: '16px',
                fontWeight: 600,
                color: TextColors.OverviewContent,
            }}>
                RECENT SWITCHES
            </Typography>

            {metrics.recentSwitches.length === 0 ? (
                <Typography sx={{
                    fontSize: '14px',
                    color: TextColors.DarkThemeGray
                }}>
                    {NA}
                </Typography>
            ) : (
                metrics.recentSwitches.map(s => (
                    <Typography key={s.id}
                        sx={{
                            fontSize: '14px',
                            color: TextColors.OverviewContent
                        }}>
                        {s.time} - switched to {s.region}
                    </Typography>
                ))
            )}
        </Stack>
    )
};