"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

function CodeLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatedSpan className={className}>
      <span className="whitespace-pre-wrap">{children}</span>
    </AnimatedSpan>
  );
}

export function AboutTerminal() {
  return (
    <Terminal
      title="sobre-mim.ts"
      className="relative w-full max-w-none rounded-none border-0 bg-canvas-soft font-mono text-xs sm:text-sm"
    >
      <TypingAnimation className="text-muted-foreground">
        // sobre mim.ts
      </TypingAnimation>

      <TypingAnimation className="text-sage">
        {"const manuella = {"}
      </TypingAnimation>

      <CodeLine className="pl-4">
        <span className="text-sage">name</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">&quot;Manuella Carvalho&quot;</span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <CodeLine className="pl-4">
        <span className="text-sage">role</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">
          &quot;front-end developer &amp; ui/ux designer&quot;
        </span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <CodeLine className="pl-4">
        <span className="text-sage">bio</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">
          &quot;do problema à entrega — figma ou react&quot;
        </span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <CodeLine className="pl-4">
        <span className="text-sage">stack</span>
        <span className="text-foreground">: [</span>
        <span className="text-terracotta">&quot;React&quot;</span>
        <span className="text-foreground">, </span>
        <span className="text-terracotta">&quot;TypeScript&quot;</span>
        <span className="text-foreground">, </span>
        <span className="text-terracotta">&quot;Figma&quot;</span>
        <span className="text-foreground">],</span>
      </CodeLine>

      <TypingAnimation className="pl-4 text-sage">
        {"expertise: {"}
      </TypingAnimation>

      <CodeLine className="pl-8">
        <span className="text-sage">frontEnd</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">
          &quot;código limpo e performático&quot;
        </span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <CodeLine className="pl-8">
        <span className="text-sage">uiUx</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">
          &quot;interfaces focadas na experiência&quot;
        </span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <CodeLine className="pl-8">
        <span className="text-sage">craft</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">
          &quot;cada pixel importa&quot;
        </span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <TypingAnimation className="pl-4 text-sage">{"},"}</TypingAnimation>

      <CodeLine className="pl-4">
        <span className="text-sage">approach</span>
        <span className="text-foreground">: </span>
        <span className="text-terracotta">
          &quot;mostrar o porquê e o resultado&quot;
        </span>
        <span className="text-foreground">,</span>
      </CodeLine>

      <TypingAnimation className="text-sage">{"} as const;"}</TypingAnimation>

      <TypingAnimation className="text-muted-foreground">
        export default manuella;
      </TypingAnimation>
    </Terminal>
  );
}
