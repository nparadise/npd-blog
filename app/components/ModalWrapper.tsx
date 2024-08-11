export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center bg-black bg-opacity-70">
      {children}
    </section>
  );
}
