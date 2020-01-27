const JuniorEdu =require('../../models/juniorEdu');
const multiparty = require("multiparty");
const xlsx = require("xlsx");


exports.upload = (req,res,next) => {
    
  const resData = {};

  const form = new multiparty.Form({
    autoFiles: true
  });
  let arrayName = "";

  form.on("file", (name, file) => {
    const workbook = xlsx.readFile(file.path);
    const sheetnames = Object.keys(workbook.Sheets);

    let i = sheetnames.length;

    while (i--) {
      const sheetname = sheetnames[i];
      arrayName = sheetname.toString();
      resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
    }
  });

  form.on("close", async() => {
    for (let i=0; i<resData[arrayName].length; i++) {
      let tmp = resData[arrayName][i];
      const newDate = new Date((parseInt(tmp["타임스탬프"]*1000)));
      const dbData = new JuniorEdu({
        timestamp :  newDate,
        name: tmp["1. 성명 (학생)"],
        birthday: tmp["2. 생년월일 (학생)"],
        school: tmp["3. 학교명 (OO초등학교, OO중학교)"], 
      });
      try{
        await dbData.save();
      }catch(e){
        console.log(e);
      }
    }
    res.send(resData);
  });

  form.parse(req);
};

exports.view = (req,res,next) => {
    let contents = "";
    contents += "<html><body>";
    contents +=
      '   <form action="/excel" method="POST" enctype="multipart/form-data">';
    contents += '       <input type="file" name="xlsx" />';
    contents += '       <input type="submit" />';
    contents += "   </form>";
    contents += "</body></html>";
    res.send(contents);
}
