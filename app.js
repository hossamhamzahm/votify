const express = require('express');
const app = express();


const port = process.env.port || 3000;


app.get('*', (req, res)=>{
    res.send("Error 404, page not found");
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));
