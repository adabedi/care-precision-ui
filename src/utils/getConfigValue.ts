// TODO [4] Add env enum
export function getConfigValue(constName: string): string {
  return (window as any)[
    `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
  ][constName];
}
