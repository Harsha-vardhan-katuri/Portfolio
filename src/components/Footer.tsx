export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Designed & Built by <span className="text-primary font-semibold">Harsha Vardhan Katuri</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
