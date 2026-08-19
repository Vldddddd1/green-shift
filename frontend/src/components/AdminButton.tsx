import { useTheme, } from '@mui/material';
import RoundedIconButton from './RoundedIconButton';
import AdminIcon from '../assets/icons/setting.svg?react';

function AdminButton() {
    const theme = useTheme();
    return (
            <RoundedIconButton
                to = '/admin'
                icon = {<AdminIcon width = {16} height = {16} style={{ color: theme.custom.backIconColor }} />}
            />
    );
}

export default AdminButton;