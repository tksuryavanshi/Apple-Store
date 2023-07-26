const jsonfile = require("jsonfile");
const simpleGit = require("simple-git");
const random = require("random");
const moment = require("moment");
const FILE_PATH = "./data.json";

const makeCommit = async (n) => {
  // Change to an async function to use await inside
  if (n === 0) return await simpleGit().push(); // Use "await" to wait for the push to complete
  const x = random.int(43, 54);
  const y = random.int(0, 6);
  const DATE = moment().subtract(1, "y").add(x, "w").add(y, "d").format();
  const data = { date: DATE };
  console.log(DATE);
  await jsonfile.writeFile(FILE_PATH, data); // Use "await" to wait for the file write to complete
  await simpleGit().add([FILE_PATH]);
  await simpleGit().commit(DATE, { "--date": DATE });
  await makeCommit(n - 1); // Use "await" to wait for the recursive call to complete
};
// make commits
makeCommit(50);
