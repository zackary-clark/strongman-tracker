import { BreakpointsOptions, createTheme, PaletteMode, PaletteOptions, Theme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
        gruv: typeof GRUVBOX;
    }

    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        gruv: typeof GRUVBOX;
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        neutral: true;
    }
}

const GRUVBOX = {
    BG: "#282828",
    RED_1: "#cc241d",
    GREEN_2: "#98971a",
    YELLOW_3: "#d79921",
    BLUE_4: "#458588",
    PURPLE_5: "#b16286",
    AQUA_6: "#689d6a",
    GRAY_7: "#a89984",
    GRAY_8: "#928374",
    RED_9: "#fb4934",
    GREEN_10: "#b8bb26",
    YELLOW_11: "#fabd2f",
    BLUE_12: "#83a598",
    PURPLE_13: "#d3869b",
    AQUA_14: "#8ec07c",
    FG: "#ebdbb2",
    BG0_H: "#1d2021",
    BG0: "#282828",
    BG1: "#3c3836",
    BG2: "#504945",
    BG3: "#665c54",
    BG4: "#7c6f64",
    ORANGE: "#d65d0e",
    BG0_S: "#32302f",
    FG4: "#a89984",
    FG3: "#bdae93",
    FG2: "#d5c4a1",
    FG1: "#ebdbb2",
    FG0: "#fbf1c7",
    FG0_H: "#f9f5d7",
    ORANGE_BRIGHT: "#fe8019",
};

const darkPalette: PaletteOptions = {
    mode: "dark",
    gruv: GRUVBOX,
    common: {
        black: GRUVBOX.BG0_H,
        white: GRUVBOX.FG0_H,
    },
    primary: {
        light: "#b3d6c9",
        main: GRUVBOX.BLUE_12,
        dark: "#56766a",
        contrastText: GRUVBOX.FG0,
    },
    secondary: {
        light: "#d7b3c0",
        main: "#a58390",
        dark: "#765663",
        contrastText: GRUVBOX.FG0,
    },
    error: {
        main: GRUVBOX.RED_9,
        dark: GRUVBOX.RED_1,
        contrastText: GRUVBOX.FG0,
    },
    warning: {
        main: GRUVBOX.YELLOW_11,
        dark: GRUVBOX.YELLOW_3,
        contrastText: GRUVBOX.BG,
    },
    info: {
        light: GRUVBOX.BLUE_12,
        main: GRUVBOX.BLUE_4,
        contrastText: GRUVBOX.FG0,
    },
    success: {
        main: GRUVBOX.AQUA_6,
        dark: GRUVBOX.AQUA_14,
        contrastText: GRUVBOX.FG0,
    },
    background: {
        default: GRUVBOX.BG,
        paper: GRUVBOX.BG,
    },
    text: {
        primary: GRUVBOX.FG0,
        secondary: GRUVBOX.FG2,
        disabled: GRUVBOX.FG4,
    },
    action: {
        active: GRUVBOX.FG,
    },
    neutral: {
        light: GRUVBOX.FG0,
        main: GRUVBOX.FG1,
        dark: GRUVBOX.FG2,
        contrastText: GRUVBOX.BG,
    },
    grey: {
        100: GRUVBOX.FG0,
        200: GRUVBOX.FG1,
        300: GRUVBOX.FG2,
        400: GRUVBOX.FG3,
        500: GRUVBOX.FG4,
        600: GRUVBOX.GRAY_8,
        700: GRUVBOX.BG4,
        800: GRUVBOX.BG2,
        900: GRUVBOX.BG0,
        A100: GRUVBOX.FG3,
        A200: GRUVBOX.FG4,
        A400: GRUVBOX.BG1,
        A700: GRUVBOX.BG3,
    },
};

const lightPalette: PaletteOptions = {
    mode: "light",
    gruv: GRUVBOX,
    common: {
        black: GRUVBOX.BG0_H,
        white: GRUVBOX.FG0_H,
    },
    primary: {
        light: "#b3d6c9",
        main: GRUVBOX.BLUE_12,
        dark: "#56766a",
        contrastText: GRUVBOX.BG,
    },
    secondary: {
        light: "#d7b3c0",
        main: "#a58390",
        dark: "#765663",
        contrastText: GRUVBOX.BG,
    },
    error: {
        main: GRUVBOX.RED_9,
        dark: GRUVBOX.RED_1,
        contrastText: GRUVBOX.BG,
    },
    warning: {
        main: GRUVBOX.YELLOW_11,
        dark: GRUVBOX.YELLOW_3,
        contrastText: GRUVBOX.BG,
    },
    info: {
        light: GRUVBOX.BLUE_12,
        main: GRUVBOX.BLUE_4,
        contrastText: GRUVBOX.BG,
    },
    success: {
        main: GRUVBOX.AQUA_6,
        dark: GRUVBOX.AQUA_14,
        contrastText: GRUVBOX.BG,
    },
    background: {
        default: GRUVBOX.FG0_H,
        paper: GRUVBOX.FG0_H,
    },
    text: {
        primary: GRUVBOX.BG,
        secondary: GRUVBOX.BG2,
        disabled: GRUVBOX.BG4,
    },
    action: {
        active: GRUVBOX.BG,
    },
    neutral: {
        light: GRUVBOX.FG0,
        main: GRUVBOX.FG1,
        dark: GRUVBOX.FG2,
        contrastText: GRUVBOX.BG,
    },
    grey: {
        100: GRUVBOX.FG0,
        200: GRUVBOX.FG1,
        300: GRUVBOX.FG2,
        400: GRUVBOX.FG3,
        500: GRUVBOX.FG4,
        600: GRUVBOX.GRAY_8,
        700: GRUVBOX.BG4,
        800: GRUVBOX.BG2,
        900: GRUVBOX.BG0,
        A100: GRUVBOX.FG3,
        A200: GRUVBOX.FG4,
        A400: GRUVBOX.BG1,
        A700: GRUVBOX.BG3,
    },
};

const breakpoints: BreakpointsOptions = {
    values: {
        xs: 360,
        sm: 680,
        md: 900,
        lg: 1200,
        xl: 1536,
    }
};

const components = {
    MuiPaper: {
        defaultProps: {
            elevation: 4,
        }
    },
    MuiDialogContent: {
        styleOverrides: {
            root: {
                paddingTop: "16px!important",
                paddingBottom: "16px!important",
            },
        },
    },
};

export const createThemeWithMode = (mode: PaletteMode): Theme => createTheme({
    breakpoints,
    components,
    palette: mode === "light" ? lightPalette : darkPalette,
});
