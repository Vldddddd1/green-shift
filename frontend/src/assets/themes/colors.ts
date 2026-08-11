export const BrandColors = {
    MainPrimary: '#3A8005', //Same for MAIN/DARK/LIGHT
    MainSecondary: '#F5EEE0', //Same for MAIN/DARK/ALTERNATIVE
    LightSecondary: '#202020',
    AltSecondary: '#14461E',
}

export const BackgroundColors = {
    DarkThemeBackground: BrandColors.LightSecondary,
    LightThemeBackground: BrandColors.MainSecondary,
    CardBackground: '#F6F6F6',
}

export const TextColors = {
    MainGreen: BrandColors.MainPrimary,
    DarkThemeText: BrandColors.MainSecondary,
    DarkThemeWhite: BackgroundColors.CardBackground,
    DarkThemeGray: '#737373',
    LightThemeText: BrandColors.LightSecondary,
    LightThemeWhite: BrandColors.MainSecondary,
    LightThemeGray: '#666666',
    OverviewContent: '#BFBFBF',
}

export const shadows = {
  lightMode: '8px 8px 16px -4px rgba(0, 0, 0, 0.2)',
  darkMode: '8px 8px 16px -4px rgba(255, 255, 255, 0.2)',
};
