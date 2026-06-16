interface ColorConfig {
  background: string;
  foreground: string;
}

interface ThemeConfig {
  background: string;
  foreground: string;
  card: ColorConfig;
  popover: ColorConfig;
  primary: ColorConfig;
  secondary: ColorConfig;
  muted: ColorConfig;
  accent: ColorConfig;
  destructive: ColorConfig;
  warning: ColorConfig;
  success: ColorConfig;
  info: ColorConfig;
  border: string;
  input: string;
  ring: string;
}

export const themeConfig: ThemeConfig = {
  background: '#E2FBFF',
  foreground: '#1A2A7A',
  card: {
    background: '#FFFFFF',
    foreground: '#1A2A7A',
  },
  popover: {
    background: '#FFFFFF',
    foreground: '#1A2A7A',
  },
  primary: {
    background: '#1A2A7A',
    foreground: '#FFFFFF',
  },
  secondary: {
    background: '#D3CDF4',
    foreground: '#1A2A7A',
  },
  muted: {
    background: '#E2FBFF',
    foreground: '#9C8FD4',
  },
  accent: {
    background: '#EBA5A3',
    foreground: '#FFFFFF',
  },
  destructive: {
    background: '#FA0C00',
    foreground: '#FFFFFF',
  },
  warning: {
    background: '#FECA13',
    foreground: '#FECA1322',
  },
  success: {
    background: '#28DE25',
    foreground: '#28DE2522',
  },
  info: {
    background: '#04B4FC',
    foreground: '#04B4FC22',
  },
  border: '#D3CDF4',
  input: '#D3CDF4',
  ring: '#9C8FD4',
};
