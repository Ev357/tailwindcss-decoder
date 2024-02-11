export const createCodeElement = (html: string) => {
  const pre = document.createElement("pre");
  const code = document.createElement("code");

  pre.appendChild(code);

  pre.setAttribute(
    "class",
    "flex overflow-auto rounded-b-lg text-sm leading-[1.5714285714] text-white sm:rounded-t-lg language-html hidden"
  );
  code.setAttribute("class", "p-4");

  code.innerHTML = html;

  return pre;
};
