declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
  }

  declare module '@env'{
    export const BASE_URL: string
  }