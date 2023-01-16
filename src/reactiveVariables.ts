import { makeVar } from "@apollo/client";
import { PaletteMode } from "@mui/material";

export const themeModeVar = makeVar<PaletteMode>("light");
