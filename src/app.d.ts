// The typing is for this library is very much out of sync
declare module 'react-table';
declare module 'country-currency-map';
declare module 'prismjs/components/prism-core';
declare module 'react-final-form-listeners';

declare module '*.svg' {
  const content: string;
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
  export const ReactComponent =  content;
}
