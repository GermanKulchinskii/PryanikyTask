import "@/app/ui/global.css"
import { inter } from "@/app/ui/fonts";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "@/app/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
                {children}
            </CssBaseline>
           </ThemeProvider>
        </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
