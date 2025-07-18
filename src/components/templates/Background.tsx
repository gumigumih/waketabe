interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-screen relative py-20 sm:py-12 bg-gradient-to-br from-amber-600 via-amber-400 to-amber-700">
      <div className="absolute inset-0 bg-[url('./assets/background.png')] bg-center opacity-30"></div>
      <div className="relative max-w-md w-full mx-auto px-4">{children}</div>
    </div>
  );
};
