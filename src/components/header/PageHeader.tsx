interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10 pt-10">
      <h1 className="text-4xl mb-4">{title}</h1>
      <h2 className="text-sm">{description}</h2>
    </header>
  );
}
