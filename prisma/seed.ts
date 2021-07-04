import { PrismaClient } from '@prisma/client'

import {
  users,
  posts,
  comments,
  postsCategories
} from './seeds'

const prisma = new PrismaClient();

async function main() {
  for (const category of postsCategories) {
    await prisma.postCategory.create({ data: category })
  }

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  for (const post of posts) {
    await prisma.post.create({ data: post })
  }

  for (const comment of comments) {
    await prisma.comment.create({ data: comment })
  }
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
