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

module.exports = {
  store,
};
