CS.Models.Strength = {
    sort: function (unsortedStrength) {
        return _.sortBy(unsortedStrength, function (strength) {
            return -strength.howWellItApplies - strength.howImportantForEmployer;
        });
    }
};
