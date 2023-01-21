import { Box, ListItem, Skeleton, Stack } from "@mui/material";
import React, { FunctionComponent } from "react";

export const PreferencesSkeleton: FunctionComponent = () => (
    <>
        <ListItem data-testid="loading">
            <Stack width="100%" marginTop={1}>
                <Skeleton variant="rounded" height={24} width={80} />
                <Stack direction="row" width="100%" alignItems="center" marginY={1}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Box width={16} />
                    <Skeleton variant="rounded" height={16} width={80} />
                </Stack>
                <Stack direction="row" width="100%" alignItems="center" marginY={1}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Box width={16} />
                    <Skeleton variant="rounded" height={16} width={80} />
                </Stack>
            </Stack>
        </ListItem>
        <ListItem>
            <Stack width="100%" marginTop={1}>
                <Skeleton variant="rounded" height={24} width={80} />
                <Stack direction="row" width="100%" alignItems="center" marginY={1}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Box width={16} />
                    <Skeleton variant="rounded" height={16} width={80} />
                </Stack>
                <Stack direction="row" width="100%" alignItems="center" marginY={1}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Box width={16} />
                    <Skeleton variant="rounded" height={16} width={80} />
                </Stack>
            </Stack>
        </ListItem>
    </>
);
