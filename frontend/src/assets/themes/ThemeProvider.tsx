import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, type PaletteMode, } from '@mui/material';
import { getDesignTokens } from './theme.ts';

interface ThemeContextType {
    toggleColorMode: () => void;
    mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType>({ mode: 'dark', toggleColorMode: () => {}, });

export const useColorMode = () => useContext(ThemeContext);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>(() => {
        return (localStorage.getItem('themeMode') as PaletteMode) || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const colorMode=  useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        mode,
    }), [mode]);

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ThemeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};