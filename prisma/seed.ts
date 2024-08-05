import { PrismaClient } from "@prisma/client";
import { posts } from "../app/lib/placeholder-data";
const prisma = new PrismaClient();

async function firstSeed() {
  const chitchat = await prisma.mainCategory.upsert({
    where: { name: "잡담" },
    update: {},
    create: {
      name: "잡담",
      children: {
        create: [
          {
            name: "잡담",
            posts: {
              create: posts.map(({ title, content }) => ({
                title: title,
                content: content,
              })),
            },
          },
        ],
      },
    },
  });

  const dev = await prisma.mainCategory.upsert({
    where: { name: "개발" },
    update: {},
    create: {
      name: "개발",
      children: {
        create: [
          { name: "React" },
          { name: "Next.js" },
          { name: "Tailwind CSS" },
        ],
      },
    },
  });

  const game = await prisma.mainCategory.upsert({
    where: { name: "게임" },
    update: {},
    create: {
      name: "게임",
      children: {
        create: { name: "게임" },
      },
    },
  });

  console.log({ chitchat, dev, game });
}

async function secondSeed() {
  const res = await prisma.post.createMany({
    data: posts.map((v) => ({
      title: v.title,
      content: v.content,
      subCategoryId: v.category,
    })),
  });

  console.log(res);
}

async function main() {
  await secondSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
