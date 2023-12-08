interface Input {
  id: number;
  title: string;
  model: string;
  required?: boolean;
  placeholder?: string;
  type: string;
  variant?: string;
  multiline?: boolean;
  rows?: number;
}

export default Input;
