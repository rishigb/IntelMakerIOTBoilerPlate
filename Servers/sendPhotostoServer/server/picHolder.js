/*The code below has been written using exprestify, a module by Ajith N N , you can find the module here:https://github.com/ajithnn/exprestify 
The code below is going to used to send files to a server and saving them there.*/

var rest = require('exprestify') //Module required

/*The following code defines where will the file be saved,how will it be named etc */
var multiopt = {
    FilePath: "./images/", //File is going to be saved at a folder called 'images'
    PostType: "file", //Mulitpart post
    Rename: function (fieldname, filename) {
        return fieldname; //Field name is what you add to the file,you then control how the file will be saved in the folder
    }
}
opt = {
    extended: false
}
var options = {
    contentType: "json",
    config: opt
}
/* For cross origin resource sharing */
var header ={
"Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
"Access-Control-Allow-Headers":"Content-Type"
};

rest.setHeaders(header);



/* How server behaves on a post request */
rest.multipost('/pagemulti', function (err, data) { //File will be posted at servername/pagemulti 
    if (!err) {
        console.log(data); //You will be able to see whether the data is posted correctly.
    } else {
        console.log(err);
    }
}, multiopt)
/* How server behaves on a get request */
rest.getfile('/images', function (err, query) {
    if (!err) {
        if (query.value) {
            return "./images/" + query.value;
        } else {
            return "";

        }
    } else {
        console.log(err);
        return err;
    }
})
/*The following will be used for telling the processor to do something it will have both post and get functionalities */
var datafromApp = "none";

rest.get('/command', function (err) {
    if (!err) {

        console.log("Ret: " + datafromApp);
        return datafromApp;
    } else {
        console.log(err);
        return err;
    }
});

rest.post('/command', function (err, data) {
    if (!err) {
        datafromApp = data.value;
        console.log("Ret: "+data.value + "success");
        return datafromApp;
    } else {
        console.log(err);
        return err;
    }
}, options);

rest.listen(3000, function () { //Running the server
    console.log("Listening on port 0.0.0.0:%s", rest.port)
})
