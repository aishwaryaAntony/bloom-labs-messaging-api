import db from "../models";

exports.fetch_country_codes = async (req, res, next) => {
	try {
		let fetchCountryCodes = await db.CountryCode.findAll();

		res.status(200).json({
			status: 'success',
			payload: fetchCountryCodes,
			message: 'Country Codes Fetched successfully'
		});

	} catch (error) {
		console.log("Error at fetching Country Codes method- GET / :" + error);
		res.status(500).json({
			status: 'failed',
			payload: null,
			message: 'Error while fetching Country Codes'
		});
	}
};

exports.create_country_code = async (req, res, next) => {
	try {

		let { name, code, iso, status } = req.body

		let createCountryCode = await db.CountryCode.create({
			name,
			code,
			iso,
			status
		});

		res.status(200).json({
			status: 'success',
			payload: createCountryCode,
			message: 'Country Codes created successfully'
		});

	} catch (error) {
		console.log("Error at creating Country Code method- POST / :" + error);
		res.status(500).json({
			status: 'failed',
			payload: null,
			message: 'Error while creating Country Codes'
		});
	}
};

exports.update_country_code = async (req, res, next) => {
	try {
		let { name, code, iso, status } = req.body
		let { id } = req.params;

		let findCountryCode = await db.CountryCode.findOne({
			where: {
				id: id
			}
		});

		if (findCountryCode === null) {
			return res.status(200).json({
				status: 'failed',
				payload: null,
				message: 'Country Code does not exist'
			});
		}

		let updatedCountryCode = await db.CountryCode.update({
			name: !!name ? name : findCountryCode.name,
			code: !!code ? code : findCountryCode.code,
			iso: !!iso ? iso : findCountryCode.iso,
			status: !!status ? status : findCountryCode.status
		}, {
			where: {
				id: findCountryCode.id
			}
		});

		res.status(200).json({
			status: 'success',
			payload: updatedCountryCode,
			message: 'Country Codes updated successfully'
		});

	} catch (error) {
		console.log("Error at updating Country Code method- PUT / :" + error);
		res.status(500).json({
			status: 'failed',
			payload: null,
			message: 'Error while updating Country Codes'
		});
	}
};
