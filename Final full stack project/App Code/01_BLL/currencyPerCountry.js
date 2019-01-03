const dal = require('./../00_DAL/index');

class CurrencyPerCountry{
    
    static createTable(){
        return dal.runQuery(`create table CurrencyPerCountry(
            Id int AUTO_INCREMENT PRIMARY KEY,
            CountryId int NOT NULL,
            CurrencyId int NOT NULL,
            FOREIGN KEY (CountryId) REFERENCES Countries(Id),
            FOREIGN KEY(CurrencyId) REFERENCES Currencies(Id)
            )`
            );
        }

    static dropTable(){
        return dal.runQuery('drop table if exists CurrencyPerCountry');
    }

    static insertTable(){
        let values=[[1,1],[1,2]];
        dal.insertTable("INSERT INTO CurrencyPerCountry (CountryId,CurrencyId) VALUES ?",values);
    }
}

module.exports={CurrencyPerCountry}
    