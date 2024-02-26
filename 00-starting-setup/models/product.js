//const product=[];
const fs=require('fs');
const path=require('path');

module.exports=class products{
    constructor(t)
    {
        this.title=t;
    }
    save()
    {
        //product.push(this);
        const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{
            let products=[];
            //console.log(fileContent);
            if(!err)
            {
                products=JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
    }

    static fetchAll(cb)
    {
        //return product;
        fs.readFile(p,(err,fileContent)=>{
            if(err)
            {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}