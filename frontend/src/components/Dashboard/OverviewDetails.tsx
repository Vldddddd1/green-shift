import { Stack, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import type { ReactNode } from 'react';

import { BrandColors, TextColors, } from '../../assets/themes/colors';

import { useLiveMetrics } from '../../hooks/liveMetrics';
import { RegionStatus } from './RegionStatus';
import { API_STATUS_CONFIG } from '../../assets/apiStatus';

const DEFAULT_POSITION = { x: 20, y: 20 } //CAN BE ADJUSTED

const NA = 'N/A';

interface PanelPosition {
    x: number;
    y: number;
}

interface OverviewDetailsProps{
    visible?: boolean;
}

function StatusDot({ color, size }: { color: string; size?: string }) {
    return (
        <Box sx={{
            width: size,
            height: size,
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

export function MetricRow({ label, value, valueColor }: { label: string; value: ReactNode; valueColor?: string }) {
    const isNA = value === NA;

    return (
        <Stack direction='row' sx={{
            justifyContent: 'space-between',
            width: '100%',
        }}>
            <Typography sx={{
                fontSize: {xs: '11px', md: '13px'},
                color: TextColors.OverviewContent
            }}>
                {label}
            </Typography>
            <Typography 
                component = 'span'
                sx={{
                    fontSize: {xs: '12px', md: '15px'},
                    fontWeight: 600,
                    color: isNA ? TextColors.DarkThemeGray : (valueColor ?? TextColors.DarkThemeText)
            }}>
                {value}
            </Typography>
        </Stack>
    );
}

export const OverviewDetails = ({ visible = true}: OverviewDetailsProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { metrics } = useLiveMetrics();

    const [showLegend, setShowLegend] = useState(false);

    const [position, setPosition] = useState<PanelPosition>(() => {
        const saved = localStorage.getItem('overviewDetailsPosition');
        return saved ? JSON.parse(saved) : DEFAULT_POSITION;
    });

    useEffect(() => {
        localStorage.setItem('overviewDetailsPosition', JSON.stringify(position));
    }, [position]);

    const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const legendRef = useRef<HTMLDivElement | null>(null);

    // const legendHeight = legendRef.current?.offsetHeight ?? 135;
    const [legendHeight, setLegendHeight] = useState(135);
    const [measuredPanelHeight, setMeasuredPanelHeight] = useState(400);

    useLayoutEffect(() => {
        setLegendHeight(legendRef.current?.offsetHeight ?? 135);
    }, [showLegend]);

    useLayoutEffect(() => {
        const el = panelRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => {
            setMeasuredPanelHeight(el.offsetHeight);
        });
        observer.observe(el);

        return () => observer.disconnect()
    }, [])

    const maxLegendTop = Math.max(window.innerHeight - legendHeight, 0);
    const desiredLegendTop = position.y + measuredPanelHeight;
    const legendTop = Math.min(desiredLegendTop, maxLegendTop);

    useEffect(() => {
        const panelHeight = panelRef.current?.offsetHeight ?? 400;
        const maxY = Math.max(window.innerHeight - panelHeight - (showLegend ? legendHeight : 0), 0);

        setPosition(pos => (pos.y > maxY ? { ...pos, y: maxY } : pos));
    }, [showLegend, legendHeight]);

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
        const panelWidth = panelRef.current?.offsetWidth ?? 360;
        const maxX = window.innerWidth - panelWidth;
        const maxY = Math.max(window.innerHeight - panelHeight - (showLegend ? legendHeight : 0), 0);

        setPosition({
            x: Math.min(Math.max(dragRef.current.originX + dx, 0), maxX),
            y: Math.min(Math.max(dragRef.current.originY + dy, 0), maxY),
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        dragRef.current = null;
    };

    if (isMobile && !visible) return null;

    return (
        <>
            <Stack
                ref={panelRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                sx={{
                    position: 'fixed',
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                    zIndex: 9000,

                    gap: {xs: '10px', md: '16px'},
                    width: {xs: '240px', md: '360px'},
                    padding: {xs: '14px 16px', md: '22px 24px'},
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
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{
                        fontSize: {xs: '13px', md: '16px'},
                        fontWeight: 600,
                        color: TextColors.DarkThemeText,
                    }}>
                        LIVE ROUTING OVERVIEW
                    </Typography>
                    <Box
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => setShowLegend(e => !e)}
                        sx={{
                            width: {xs: '16px', md: '20px'},
                            height: {xs: '16px', md: '20px'},
                            borderRadius: '50%',
                            border: `1px solid ${TextColors.OverviewContent}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: {xs: '10px', md: '12px'},
                            color: TextColors.OverviewContent,
                            cursor: 'pointer',
                        }}
                    >
                        i
                    </Box>
                </Stack>

                <MetricRow
                    label="Active Region"
                    value={display(metrics.activeRegion)}
                    valueColor={BrandColors.MainPrimary}
                />
                <MetricRow
                    label="Carbon Emissions Saved"
                    value={display(metrics.carbonSavedKg != null ? `${metrics.carbonSavedKg.toFixed(1)} kg CO2` : NA)}
                />
                <MetricRow
                    label="Savings Multiplier"
                    value={display(metrics.savingsMultiplier != null ? `${metrics.savingsMultiplier.toFixed(1)}x` : NA)}
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
                                <StatusDot color={API_STATUS_CONFIG[metrics.apiHealth].color} size={isMobile? '6px' : '8px'} />
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
                    fontSize: {xs: '13px', md: '16px'},
                    fontWeight: 600,
                    color: TextColors.OverviewContent,
                }}>
                    RECENT SWITCHES
                </Typography>

                {metrics.recentSwitches.length === 0 ? (
                    <Typography sx={{
                        fontSize: {xs: '12px', md: '14px'},
                        color: TextColors.DarkThemeGray
                    }}>
                        {NA}
                    </Typography>
                ) : (
                    <Stack 
                        onPointerDown = {(e) => e.stopPropagation()}
                        sx={{
                            gap: '6px',
                            maxHeight: {xs: '150px', md: 'none'},
                            overflowY: {xs: 'auto', md: 'visible'},
                    }}>
                        {metrics.recentSwitches.map(s => (
                        <Typography key={s.id}
                            sx={{
                                fontSize: {xs: '12px', md: '14px'},
                                color: TextColors.OverviewContent
                            }}>
                            {s.time} - switched to {s.region}
                        </Typography>
                    ))}
                    </Stack>
                    
                )}
            </Stack>
            {
                showLegend && (
                    <RegionStatus
                        ref={legendRef}
                        top={legendTop}
                        left={position.x}
                    />
                )
            }
        </>
    )
};