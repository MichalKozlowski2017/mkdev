type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Klasa na kontener opisu (np. max-w) */
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  descriptionClassName = "max-w-2xl text-pretty text-zinc-600 dark:text-zinc-400",
}: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-pretty text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.08] dark:text-zinc-50">
        {title}
      </h2>
      {description ? <p className={`text-base leading-relaxed ${descriptionClassName}`}>{description}</p> : null}
    </div>
  );
}
