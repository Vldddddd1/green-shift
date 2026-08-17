import { useTheme, } from '@mui/material';
import RoundedIconButton from './RoundedIconButton';
import BackIcon from '../assets/icons/backIcon.svg?react';

function BackButton() {
    const theme = useTheme();
    return (
        <RoundedIconButton
            to = '/'
            icon = {<BackIcon style={{ color: theme.custom.backIconColor }} />}
        />
    );
}

export default BackButton;