const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'signup'
}
);


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES ?";
    const values = [
        [req.body.formData.name, req.body.formData.email, req.body.formData.password]
    ];
    console.log(values);
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error in sending to mysql:", err);
            return res.json({ error: "Error" });
        }
        console.log("Data inserted successfully:", data);
        return res.json(data);
    });
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.formData.email, req.body.formData.password], (err, data) => {
        if (err) {
            console.error("Error in sending to mysql:", err);
            return res.json({ error: "Error" });
        }
        if (data.length > 0) {
            const id = data[0].id;
            const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 }); //It will last 5 mins
            return res.json({ Login: true, token, data });
        } else {
            return res.json("Failed");
        }
    });
})


    const verifyJwt = (req, res, next) => {
        const token = req.headers["access-token"];
        if(!token){
            return res.json("Provide the token next time");
        }else{
            jwt.verify(token,"jwtSecretKey", (err,decoded) => {
                if(err){
                    res.json("Not Authenticated");
                }
                else{
                    req.userId = decoded.id;
                    next();
                }
            })
        }
    }

    app.get('/checkAuth', verifyJwt, (req, res) => {
        return res.json("Authenticated");
    })
    
    app.listen(8081, () => {
    console.log("Server is running at 8081")
})