// contract("MyContractTest", function (accounts) {
//     let myContract;
//     let owner = accounts[0];
//     let nonOwner = accounts[1];
//     let catchRevert = require("./exceptions.js").catchRevert;

//     describe("sanity assertion:", function () {
//         before(async function () {
//             myContract = await artifacts.require("MyContract.sol").new();
//         });
//         it("should complete successfully", async function () {
//             await myContract.func({
//                 from: owner
//             });
//         });
//         it("should abort with an error", async function () {
//             await catchRevert(myContract.func({
//                 from: nonOwner
//             }));
//         });
//     });
// });