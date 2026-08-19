import { Box } from '@mui/material'

interface StatusDotProps{
    color: string;
    size?: string;
    stroke?: string;
}

function StatusDot({ color, size = '8px', stroke }: StatusDotProps) {
    return (
        <Box sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            ...(stroke ? { border: `2px solid ${stroke}`, boxSizing: 'border-box' } : {}),
            flexShrink: 0,
        }} />
    );
}

export default StatusDot;