// TODO [1] Add env enum
export function getEnvTruthly(constName: string): boolean {
  return (window as any)[
    `${process.env.NODE_ENV === 'production' ? 'injectedEnv' : '_env_'}`
  ][constName];
}
