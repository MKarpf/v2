const dal = require('./../00_DAL/index');

class triviaQueryCreator{

    static randNumber(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }

    static randLetter(){
        return String.fromCharCode(this.randNumber(65,90))
    }

    static selectFromTable(sql){
        let randLetter=`${this.randLetter()}%`;
        let result=dal.selectFromTable(sql,randLetter);
        let index=this.randNumber(1,result.length);
        return result[index];
    }

    static selectCountryFlag(){
        let sql="select Flag from Countries where CountryName like  ?";
        let result=this.selectFromTable(sql);
        return {
            countryName: result.CountryName,
            flag: result.Flag
        }; 
    }

    static selectCountryName(){
       let sql="select CountryName from Countries where CountryName like  ?";
       let result =this.selectFromTable(sql);
       return {
            countryName: result.CountryName
       };
    }

    static selectCountryCapital(){
        let sql="select Capital from Countries where CountryName like  ?";
        let result =this.selectFromTable(sql);
        return {
           countryName: result.CountryName,
           capital: result.Capital
        };
     }
    /***
    static selectCountryCapital1(){
        let sql="select Capital,Region from Countries where CountryName like  ?";
        let result=dal.selectFromTable(sql,'S%');
        Object.keys(result).filter(function(key) {
            var row = result[key];
            console.log(row.Region);
            console.log(row.Capital);
        });
        //let index=this.selectFromTable(sql);
        //return this.result[index].Capital;
     }**/ 

 

}

module.exports={triviaQueryCreator}