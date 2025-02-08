export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-screen bg-indigo-950">
      <div className="bg-white p-8 min-w-96 rounded-md shadow-md">
        {children}
      </div>
    </div>
  );
}
