const users = require("../public/data/MOCK_DATA.json");

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
    const firstnameSearch = user.firstname.toString() === search;
    const lastnameSearch = user.lastname.toString() === search;
    const emailSearch = user.email.toString() === search;
    const genderSearch = user.gender.toString() === search;
    const phoneSearch = user.phone.toString() === search;
    const birthDateSearch = user.birthDate.toString() === search;
    const birthPlaceSearch = user.birthPlace.toString() === search;
    return (
      idSearch ||
      firstnameSearch ||
      lastnameSearch ||
      genderSearch ||
      emailSearch ||
      phoneSearch ||
      birthDateSearch ||
      birthPlaceSearch
    );
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
