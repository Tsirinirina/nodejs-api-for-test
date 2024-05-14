const movies = require("../public/data/movies.json");

exports.getAllMovies = (req, res) => {
  console.log(`${req.method} : requêtes vers user${req.url}`);

  return res.json({
    data: movies,
  });
};

exports.getPaginatedMovies = (req, res) => {
  console.log(`${req.method} : requêtes vers user${req.url}`);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = req.query.search
    ? req.query.search.toString().toLowerCase()
    : "";
  const filterList = req.query.filterList && req.query.filterList;
  const filterSearch = req.query.filterSearch && req.query.filterSearch;
  const filterDate = req.query.filterDate && req.query.filterDate;

  // console.log("filterDate=", filterDate);
  const filterListKey = filterList && filterList.split(":")[0];
  const filterListValues = filterList && filterList.split(":")[1].split(";");
  console.log("filterListKey=", filterListKey);
  console.log("filterListValues=", filterListValues);

  // const filterResultes =
  //   filterList &&
  //   movies.filter((movie) => {
  //     console.log("Obj=", Object.values(movie).keys(filterListKey));
  //   });
  // movies.filter((item) => {
  //   // console.log("item=", item);
  //   return filterListValues.map(
  //     (value) =>   {
  //       if(Object.keys() filterListKey === value.toLowerCase().toString())

  //     }
  //   );
  // });

  // console.log("filterResultes==", filterResultes);
  // const filterKeywords = req.query;
  // {
  //   adult: false,
  //   backdrop_path: "/9RWPPVB9ZPsrqALjcXKkl5rwijN.jpg",
  //   genre_ids: [14, 16, 12],
  //   id: 4935,
  //   original_language: "ja",
  //   original_title: "ハウルの動く城",
  //   overview:
  //     "Sophie, a young milliner, is turned into an elderly woman by a witch who enters her shop and curses her. She encounters a wizard named Howl and gets caught up in his resistance to fighting for the king.",
  //   popularity: 153.911,
  //   poster_path: "/6pZgH10jhpToPcf0uvyTCPFhWpI.jpg",
  //   release_date: "2004-09-09",
  //   title: "Howl's Moving Castle",
  //   video: false,
  //   vote_average: 8.41,
  //   vote_count: 9337,
  // },

  const searchResults = movies.filter((movie) => {
    const idSearch = movie.id.toString() === search;
    const titleSearch = movie.title.toLowerCase().includes(search);
    const genreSearch = movie.genre_ids.includes(Number(search));
    const originalTitle = movie.original_title.toLowerCase().includes(search);
    return idSearch || titleSearch || genreSearch || originalTitle;
  });

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedMovies =
    search != ""
      ? searchResults.slice(startIndex, endIndex)
      : movies.slice(startIndex, endIndex);

  return res.json({
    data: paginatedMovies,
    currentPage: page,
    pageSize: pageSize,
    totalPages: Math.ceil(movies.length / pageSize),
  });
};
