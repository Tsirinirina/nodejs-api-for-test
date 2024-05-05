const users = require("../public/data/users.json");

exports.getAllUser = (req, res) => {
  console.log(`${req.method} : requêtes vers user${req.url}`);

  // Réponse avec les données paginées
  return res.json({
    data: users,
  });
};

exports.getPaginatedUser = (req, res) => {
  console.log(`${req.method} : requêtes vers user${req.url}`);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = req.query.search || "";

  const searchResults = users.filter((user) => {
    const idSearch = user.id.toString() === search;
    const nameSearch = user.name.toString() === search;
    const ageSearch = user.age.toString() === search;
    const genderSearch = user.gender.toString() === search;
    return idSearch || nameSearch || ageSearch || genderSearch;
  });

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedUsers =
    search != ""
      ? searchResults.slice(startIndex, endIndex)
      : users.slice(startIndex, endIndex);

  return res.json({
    data: paginatedUsers,
    currentPage: page,
    pageSize: pageSize,
    totalPages: Math.ceil(users.length / pageSize),
  });
};
