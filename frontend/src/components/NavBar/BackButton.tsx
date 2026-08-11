import { useTheme, Button } from '@mui/material';
import { Link } from 'react-router';
import { BrandColors } from '../../assets/themes/colors';

import BackIcon from '../../assets/icons/backIcon.svg?react';

function BackButton() {
    const theme = useTheme();
    return (
            <Button
                variant="contained"
                component={Link} to="/"

                sx={{
                    backgroundColor: BrandColors.MainPrimary,
                    minWidth: 0,
                    width: '32px',
                    height: '32px',
                    padding: 0,
                    borderRadius: '50%',
                }}
            >
                <BackIcon style={{ color: theme.custom.backIconColor }} />
            </Button>
    );
}

export default BackButton;