import { Box } from "@mui/material";
import { BrandColors, TextColors } from "../../assets/themes/colors";

interface FilterPillProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
    return (
        <Box
            component='button'
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Sora',
                border: `1px solid ${active ? BrandColors.MainPrimary : 'rgba(255,255,255,0.15)'}`,
                backgroundColor: active ? BrandColors.MainPrimary : 'rgba(255,255,255,0.04)',
                color: active ? TextColors.DarkThemeWhite : TextColors.OverviewContent,
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
                '&:hover': {
                    borderColor: BrandColors.MainPrimary
                }
            }}
        >
            {label}
        </Box>
    )
}

export default FilterPill