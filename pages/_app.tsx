import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import {ToastProvider} from "@heroui/toast";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <ToastProvider placement={'top-right'} />
            <NextThemesProvider attribute="class" defaultTheme="light">
                <Component {...pageProps} />
            </NextThemesProvider>
        </HeroUIProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};
