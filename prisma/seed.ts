import { PrismaClient } from "@prisma/client";
import { LoremIpsum } from "lorem-ipsum";
import { posts } from "../app/lib/placeholder-data";
const prisma = new PrismaClient();

async function firstSeed() {
  const chitchat = await prisma.mainCategory.upsert({
    where: { name: "잡담" },
    update: {},
    create: {
      name: "잡담",
      children: {
        create: { name: "잡담" },
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

async function thirdSeed() {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      title: lorem.generateSentences(1),
      content: lorem.generateParagraphs(1),
      subCategoryId: Math.floor(Math.random() * 4 + 1),
    });
  }
  const res = await prisma.post.createMany({ data });
}

async function main() {
  await firstSeed();
  await thirdSeed();
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
