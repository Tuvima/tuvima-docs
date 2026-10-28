// Starlight's virtual modules are not typed for component overrides; declare the ones the overrides import.
declare module 'virtual:starlight/components/*' {
  const component: (props: Record<string, unknown>) => unknown;
  export default component;
}
declare module 'virtual:starlight/project-context' {
  const project: { trailingSlash: 'always' | 'never' | 'ignore' };
  export default project;
}
declare module 'virtual:starlight/pagefind-config' {
  export const pagefindUserConfig: Record<string, unknown>;
}
