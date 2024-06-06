const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { title, content } = req.body;

  const slug = title.toLowerCase().split(" ").join("-");

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
    },
  });

  res.json(post);
};

const index = async (req, res) => {
  const posts = await prisma.post.findMany();

  res.json(posts);
};

const show = async (req, res) => {
  const { slug } = req.params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  res.json(post);
};

const update = async (req, res) => {
  const { slug } = req.params;
  const { title, content, published } = req.body;

  const post = await prisma.post.update({
    where: {
      slug,
    },
    data: {
      title,
      content,
      published,
    },
  });

  res.json(post);
};

module.exports = {
  index,
  show,
  store,
  update,
};
