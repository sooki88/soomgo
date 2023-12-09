export function ErrorMessage(props: { text: string }) {
  const { text } = props;

  return (
    <div
      style={{
        color: "red",
      }}
    >
      {text}
    </div>
  );
}
