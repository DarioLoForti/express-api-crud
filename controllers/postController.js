const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { title, content } = req.body;

  const slug = title.toLowerCase().split(" ").join("-");

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const index = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const show = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const update = async (req, res) => {
  const { slug } = req.params;
  const { title, content, published } = req.body;

  try {
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
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const destroy = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.delete({
      where: {
        slug,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
