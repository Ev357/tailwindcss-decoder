import { TailwindConverter } from "css-to-tailwindcss";

const converter = new TailwindConverter({
  remInPx: null,
});

const inputCSS = `
.sz {
  margin: 1rem;
}
`;

converter.convertCSS(inputCSS).then(({ nodes }) => {
  console.log(nodes[0]?.tailwindClasses);
});
