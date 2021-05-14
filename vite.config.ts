import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import ViteFonts from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        vanillaExtractPlugin(),
        ViteFonts({
            google: {
                families: ["Source Sans Pro", "Roboto", "Material+Icons"],
            },
        }),
    ],
});
