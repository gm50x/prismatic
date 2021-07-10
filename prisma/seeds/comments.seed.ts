import { Prisma } from '@prisma/client'
export const comments: Prisma.CommentCreateInput[] = [
  {
    title: 'Awesome first post!',
    content: 'I really liked the way you talked about the subject! You\'re a born writer!',
    author: {
      connect: {
        email: 'kratos@gow.com'
      }
    },
    post: {
      connect: {
        id: 1
      }
    }
  },
  {
    title: 'Awesome second post!',
    content: 'I really liked the way you talked about the subject! You\'re a born writer!',
    author: {
      connect: {
        email: 'nate@uncharted.com'
      }
    },
    post: {
      connect: {
        id: 2
      }
    }
  },
  {
    title: 'Awesome first post again!',
    content: 'I really liked the way you talked about the subject! You\'re a born writer!',
    author: {
      connect: {
        email: 'nate@uncharted.com'
      }
    },
    post: {
      connect: {
        id: 1
      }
    }
  },
]