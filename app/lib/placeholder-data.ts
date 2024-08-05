const mainCategories: string[] = ["잡담", "개발", "게임"];
const subCategories = [
  { name: "잡담", parent: "잡담" },
  { name: "React", parent: "개발" },
  { name: "Next.js", parent: "개발" },
  { name: "Tailwind CSS", parent: "개발" },
  { name: "게임", parent: "게임" },
];
const posts = [
  // {
  //   title: "안녕하세요. 첫 글입니다.",
  //   content: "이 글은 이 블로그의 첫 글입니다. 반갑습니다.",
  //   category: "잡담",
  // },
  // {
  //   title:
  //     "Esse culpa deserunt adipisicing aliquip quis ad amet velit voluptate cillum consequat ex.",
  //   content:
  //     "In qui tempor consequat ad consequat. Et reprehenderit duis adipisicing deserunt ad. Sit nostrud dolore officia sunt eu minim aliqua amet mollit consectetur culpa. Excepteur magna consectetur est culpa sit qui culpa et eu. Enim mollit et aliquip sunt aliqua consectetur nulla ullamco. Ea ut quis Lorem eu ipsum ullamco aliquip incididunt cupidatat eu pariatur. Commodo do nisi eu dolore exercitation occaecat aliquip tempor consequat reprehenderit ipsum in.",
  //   category: "잡담",
  // },
  {
    title:
      "Nostrud excepteur ipsum commodo commodo reprehenderit cupidatat cillum sint dolor quis anim ut anim.",
    content:
      "Labore sit amet est dolor velit est veniam reprehenderit irure id pariatur voluptate dolore. Aliqua in anim irure aliqua magna eiusmod non. Officia cupidatat nostrud incididunt et. Cupidatat aute sunt anim ad.",
    category: 2,
  },
  {
    title:
      "Ullamco magna anim nulla fugiat sit Lorem do in. Elit eiusmod culpa est magna fugiat quis est in. Labore laborum ex dolor labore mollit. Pariatur consectetur do eiusmod aute sit ea nisi minim.",
    content:
      "Veniam labore ut dolor fugiat quis anim. Ex adipisicing ex aliqua aliqua in culpa dolor adipisicing tempor reprehenderit. Deserunt sunt nisi dolor proident ad ad ut aute labore proident mollit dolore exercitation laborum. Fugiat aliqua nostrud exercitation ad pariatur cillum reprehenderit cupidatat irure tempor do irure.",
    category: 3,
  },
];

export { mainCategories, subCategories, posts };
