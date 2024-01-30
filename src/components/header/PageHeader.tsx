import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="mb-20 pt-10">
      <h1 className="text-4xl mb-4">{title}</h1>
      <p className="text-s">{description}</p>
    </section>
  );
}
