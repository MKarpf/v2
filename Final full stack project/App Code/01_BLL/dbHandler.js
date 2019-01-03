const dal = require('./../00_DAL/index');

const { Country } = { ...require('./country') };
const { Border } = { ...require('./border') };
const { Currency } = { ...require('./currency') };
const { CurrencyPerCountry } = { ...require('./currencyPerCountry') };
const { Language } = { ...require('./language') };
const { LanguagePerCountry } = { ...require('./languagePerCountry') };

class DbHandler {

    static createDatabase() {
        return new Promise(
            (resolve, reject) => {
                dal.createDB()
                    .then(DbHandler.createAllTables)
                    .then(DbHandler.insertAllTables)
                    .then(resolve)
                    .catch(reject)
            });

    }

    static createAllTables() {
        return Promise.all([
            Currency.createTable(),
            Language.createTable(),
            Country.createTable(),
            LanguagePerCountry.createTable(),
            CurrencyPerCountry.createTable(),
            Border.createTable()
        ]);

    }

    static dropAllTables() {
        return dal.connect()
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 0'))
            .then(
                () =>
                    Promise.all([
                        Currency.dropTable(),
                        Language.dropTable(),
                        Country.dropTable(),
                        LanguagePerCountry.dropTable(),
                        CurrencyPerCountry.dropTable(),
                        Border.dropTable()
                    ])
            )
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 1'))
    }

    static insertAllTables() {
        return Country.insertTable()
            .then(Language.insertTable)
            .then(Currency.insertTable)
        .then(LanguagePerCountry.insertTable)
        //.then(CurrencyPerCountry.insertTable)
        //.then(Border.insertTable)
    }
}


module.exports = { DbHandler };