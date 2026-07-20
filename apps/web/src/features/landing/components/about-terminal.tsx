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
      className="relative w-full max-w-none rounded-2xl border border-[#44475a] bg-[#282a36] font-mono text-xs shadow-2xl shadow-black/30 sm:text-sm"
    >
      <TypingAnimation className="text-[#ff79c6]">
        {"const manuella = {"}
      </TypingAnimation>

      <CodeLine className="pl-4">
        <span className="text-[#8be9fd]">name</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">&quot;Manuella Carvalho&quot;</span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <CodeLine className="pl-4">
        <span className="text-[#8be9fd]">role</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">
          &quot;front-end developer &amp; ui/ux designer&quot;
        </span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <CodeLine className="pl-4">
        <span className="text-[#8be9fd]">bio</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">
          &quot;do problema à entrega — figma ou react&quot;
        </span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <CodeLine className="pl-4">
        <span className="text-[#8be9fd]">stack</span>
        <span className="text-[#f8f8f2]">: [</span>
        <span className="text-[#f1fa8c]">&quot;React&quot;</span>
        <span className="text-[#f8f8f2]">, </span>
        <span className="text-[#f1fa8c]">&quot;TypeScript&quot;</span>
        <span className="text-[#f8f8f2]">, </span>
        <span className="text-[#f1fa8c]">&quot;Figma&quot;</span>
        <span className="text-[#f8f8f2]">],</span>
      </CodeLine>

      <TypingAnimation className="pl-4 text-[#8be9fd]">
        {"expertise: {"}
      </TypingAnimation>

      <CodeLine className="pl-8">
        <span className="text-[#8be9fd]">frontEnd</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">
          &quot;código limpo e performático&quot;
        </span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <CodeLine className="pl-8">
        <span className="text-[#8be9fd]">uiUx</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">
          &quot;interfaces focadas na experiência&quot;
        </span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <CodeLine className="pl-8">
        <span className="text-[#8be9fd]">craft</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">
          &quot;cada pixel importa&quot;
        </span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <TypingAnimation className="pl-4 text-[#f8f8f2]">{"},"}</TypingAnimation>

      <CodeLine className="pl-4">
        <span className="text-[#8be9fd]">approach</span>
        <span className="text-[#f8f8f2]">: </span>
        <span className="text-[#f1fa8c]">
          &quot;mostrar o porquê e o resultado&quot;
        </span>
        <span className="text-[#f8f8f2]">,</span>
      </CodeLine>

      <TypingAnimation className="text-[#ff79c6]">{"} as const;"}</TypingAnimation>

      <TypingAnimation className="text-[#6272a4]">
        export default manuella
      </TypingAnimation>
    </Terminal>
  );
}
