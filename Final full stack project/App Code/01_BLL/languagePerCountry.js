const dal = require('./../00_DAL/index');

class LanguagePerCountry {

    static createTable() {
        return dal.runQuery(`create table LanguagePerCountry(
            Id int AUTO_INCREMENT PRIMARY KEY,
            LanguageId int NOT NULL,
            CountryId int NOT NULL,
            FOREIGN KEY (LanguageId) REFERENCES Languages(Id),
            FOREIGN KEY (CountryId) REFERENCES Countries(Id)
            )`
        );
    }

    static dropTable() {
        return dal.runQuery('drop table if exists LanguagePerCountry');
    }

    static insertTable() {
        return this.getValues()
            .then(val => dal.runQueryWithParam("INSERT INTO LanguagePerCountry (LanguageId,CountryId) VALUES ?", val))
    }

    static async getValues() {

        let countries = require('./countriesData.json');

        return Promise.all(
            countries.map(country =>
                new Promise((resolve, reject) => {
                    let countryId;
                    dal.runQueryWithParam("select Id from Countries where CountryName like  ?", country.name)
                        .then(res => {
                            countryId = res;
                            return Promise.all(
                                country.languages.map(
                                    lang => dal.runQueryWithParam("select Id from Languages where LanguageName =  ?", lang.name)))
                        })
                        .then(arr => {
                            resolve(arr.map(x => [x, countryId]))
                        })
                }
                )))
            .then(
                matrix => {
                    let newMatrix = [];
                    for (z of matrix) {
                        for (y of z)
                            newMatrix.push(y);
                    }
                }
            )

    }
}


module.exports = { LanguagePerCountry }