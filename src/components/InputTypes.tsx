// InputTypes.ts

export interface InputProps {
    placeholder?: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;
    value?: string; 
  }
  
  export interface IconProps {
    onPress: () => void;
  }
  