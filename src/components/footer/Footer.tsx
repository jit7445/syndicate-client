type FooterProps = {
  style?: React.CSSProperties;
};

export default function Footer({ style }: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: "#F8F6F3",
        borderTop: "1px solid #E9E4DC",
        ...style,
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between text-sm text-text-secondary">
        <span>© {new Date().getFullYear()} Infollion. On demand experts.</span>
      </div>
    </footer>
  );
}
