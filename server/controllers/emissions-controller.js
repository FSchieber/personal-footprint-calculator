const emissionFactors = require("../config/emission-factors");

handleApiError = function (err, res) {
    if (err) console.log('API ERROR', err);
    if (!res) return;
    res.status(500).json({
        message: "Something went wrong."
    });
};

// sends an emissions object with the following format: 
/*
    {
        "emissions": 100,
        "unit": "kg"
        "type": "electricity"
    }
*/
sendEmissions = function (res, emissionData) {
    res.status(200).json({
        emissions: emissionData.totalEmissions,
        unit: emissionData.unit,
        type: emissionData.emissionType
    });
};

// We trust all requests to have a valid 'usage' parameter
// since the route has a middleware to validate it

exports.getEmissions = function (req, res) {
    try {
        const usage = req.query.usage;
        const emissionType = req.params.emissionType;
        const emissionFactor = emissionFactors[emissionType] || 0;

        // The formula for calculating the emissions is:
        // usage * emissionFactor = totalEmissions
        // For example, if the usage of electricity is 100 kWh and the emission factor is 0.5 kg/kWh
        // then the total emissions is 50 kg CO2e/yr
        // as in: 100 kWh/year * 0.5 kg CO2e/kWh = 50 kg CO2e/yr
        // Some emission types receive inputs in week or day, for example, so we also perform the necessary conversions
        let totalEmissions = usage * emissionFactor;
        if (emissionType === "waste") {
            totalEmissions *= 52; // Waste input is in weeks, so we multiply by 52 weeks to get the emissions in a year
        } else if (emissionType === "water") {
            totalEmissions *= 365; // Water input is in days, so we multiply by 365 days to get the emissions in a year
        } else if (emissionType === "flying") {
            // A 9% uplift factor is used in the calculation to account for the non-direct nature of flights
            totalEmissions *= 1.09;
        }

        sendEmissions(res, { totalEmissions: totalEmissions, unit: "kg", emissionType: emissionType });
    } catch (err) {
        handleApiError(err, res);
    };
};