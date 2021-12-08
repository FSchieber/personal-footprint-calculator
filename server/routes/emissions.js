const express = require("express");
const router = express.Router();
const emissionsController = require("../controllers/emissions-controller");
const emissionFactors = require("../config/emission-factors");

// checks if the requests contain a valid 'emissionType' parameter and a valid 'usage' parameter
emissionsMiddleware = function (req, res, next) {
    // All valid emission types are stored in the emissionFactors object
    // so we can use it to verify if the received emission type is valid
    const validEmissionTypes = Object.keys(emissionFactors);

    if (!req.params.emissionType) {
        return res.status(400).json({
            error: "Missing parameter: emissionType"
        });
    } else if (!validEmissionTypes.includes(req.params.emissionType)) {
        return res.status(400).json({
            error: req.params.emissionType + " is not a valid emission type"
        });
    }

    if (req.query.usage) {
        if (isNaN(req.query.usage)) {
            res.status(400).json({
                error: "The 'usage' parameter must be a number"
            });
        } else {
            req.query.usage = parseFloat(req.query.usage);
            next();
        };
    } else {
        res.status(400).json({
            error: "Missing parameter: usage"
        });
    }
};

// GET /api/v1/emissions/{emissionType}/?usage={usage}
router.get("/:emissionType", emissionsMiddleware, emissionsController.getEmissions);

module.exports = router;