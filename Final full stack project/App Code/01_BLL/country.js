const dal = require('./../00_DAL/index');

class Country {

    static createTable() {
        return dal.runQuery(`
            create table Countries(
                Id int AUTO_INCREMENT PRIMARY KEY,
                CountryName nvarchar(20) NOT NULL,
                Alpha2Code nvarchar(2) NOT NULL,
                CallingCode nvarchar(4) NOT NULL,
                Capital nvarchar(20) NOT NULL,
                Region nvarchar(10) NOT NULL,
                Subregion nvarchar(30) NOT NULL,
                CountryPopulation int NOT NULL,
                Lat decimal NOT NULL,
                Lng decimal NOT NULL,
                Area decimal NOT NULL,
                Flag nvarchar(150)NOT NULL
            )`
        );
    }

    static dropTable() {
        return dal.runQuery('drop table if exists Countries');
    }

    static insertTable() {
        return dal.runQueryWithParam(`
                INSERT INTO Countries 
                (CountryName,Alpha2Code,CallingCode,Capital,Region,Subregion,CountryPopulation,Lat,Lng,Area,Flag) 
                VALUES ?`, 
        Country.getValues());
    }

    static getValues() {
        let countries = require('./countriesData.json');
        return countries.map((country) => 
            [
                country.name,
                country.alpha2Code,
                country.callingCodes[0],
                country.capital,
                country.region,
                country.subregion,
                country.population,
                country.latlng[0],
                country.latlng[1],
                country.area,
                country.flag
            ]
        );
    }
}



module.exports = { Country }

