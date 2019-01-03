const dal = require('./../00_DAL/index');

class Border{

    static createTable(){
         return dal.runQuery(`create table Border(
            Id int AUTO_INCREMENT PRIMARY KEY,
            CountryId int NOT NULL,
            BorderCountryId int NOT NULL,
            FOREIGN KEY (CountryId) REFERENCES Countries(Id),
            FOREIGN KEY (BorderCountryId) REFERENCES Countries(Id)
            )`
        );
    }

    static dropTable(){
        return dal.runQuery('drop table if exists Border');
    }

    static insertTable(){
        let values=Border.getValues();
        console.log(values);
        dal.insertTable("INSERT INTO Border (CountryId,BorderCountryId) VALUES ?",values);
    }

    static getValues(){
        let countries=dal.getAllJsonData();
        let borders=[];
        countries.filter((country)=>{
            let countryId=dal.selectFromTable("select Id from Countries where CountryName = ?",country.name);
            console.log(countryId);
            countryId=countryId.Id;
            country.borders.map(function(border){
                let bord =[];
                let borderId=dal.selectFromTable("select Id from Countries where CountryName=?",border);
                bord.push(countryId,borderId);
                borders.push(bord);
            });
        });
        return borders;
    }

}

module.exports={ Border}


