// Parse command line arguments using yargs
var argv = require("yargs")
	.command("master", "Load DB", function (yargs) { })
	.help("help").argv;
var command = argv._[0];
import Excel from "exceljs";
import db from "../src/models";

const loadMasterTable = filename => {
	return new Promise(async (resolve, reject) => {
		try {
			let workbook = new Excel.Workbook();
			console.log("File name => " + filename);
			await workbook.xlsx.readFile(filename);
			console.log("\n**********Master tables started loading**********\n");
			await loadCountryCodes(workbook);
			console.log("\u2714 country codes data loaded \u2705 \n");
			console.log("\n**********Master tables loaded successfully**********\n");
			resolve("Success");
		} catch (error) {
			console.log("\u274c Error ==> " + error);
			reject(error);
		}
	});
};


const loadCountryCodes = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("CountryCodes");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let countryCodeArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let countryCodeObj = {};
					countryCodeObj.name = row.getCell(1).value;
					countryCodeObj.iso = row.getCell(2).value;
					countryCodeObj.code = row.getCell(3).value;
					countryCodeArray.push(countryCodeObj);
					if (row === lastRow) {
						if (!isRejected === true) {
							for (let countryCode of countryCodeArray) {
								const { name, code, iso } = countryCode;
								try {
									if (code !== null) {
										await db.CountryCode.create({
											name,
											code: "+"+code,
											iso,
											status: "ACTIVE"
										});
									}
								} catch (error) {
									console.log(`\nError at CountryCode ==> ${error}`)
								}
							}
							resolve("CountryCode table loaded successfully");
						}
					}
				}
			});
		} catch (error) {
			console.log("\u274c Error ==> " + error);
			resolve(error);
		}
	});
};

if (command === "master") {
	try {
		console.log("Loading data from " + argv._[1]);
		if (argv._[1] !== undefined && argv._[1] !== "") {
			loadMasterTable(argv._[1]).then(result => {
				process.exit();
			});
		}
	} catch (error) {
		console.log("error=================>" + error);
	}
}
