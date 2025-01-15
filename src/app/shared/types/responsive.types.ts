export type BreakpointOrientation = 'down' | 'up'
export type BreakpointValues = Record<ScreenSize, number>
export type ResponsiveBreakpoint = ScreenSize | `${BreakpointOrientation}:${ScreenSize}`
export type ScreenSize = '2xl' | 'lg' | 'md' | 'sm' | 'xl'
