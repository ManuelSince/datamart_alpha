const onKeyPress = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      const { target } = e;
      console.log((target as HTMLButtonElement).value);
      return null;
      break;
    default:
      alert(e);
  }
};
const onSubmit = (e: MouseEvent) => {
  const { target } = e;
  console.log((target as HTMLButtonElement).value);
};
export { onKeyPress, onSubmit };
