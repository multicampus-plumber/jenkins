const express = require('express')
const session = require('express-session')
const path = require('path');
const app = express()
const port = 3001
const cors = require('cors');

const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
	key: 'session_cookie_name',
    secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

const corsOptions ={
    origin: true ,
    methods: ["GET" ,"POST", "PUT" , "DELETE"],
    allowdHeaders: ["Conten-Type" , "Authorization"],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {    
   // res.send("테스트테스트")
    /*req.sendFile(path.join(__dirname, '/build/index.html'));*/
})

app.get('/api', (req, res) => {    
    res.send("테스트테스트")
    /*req.sendFile(path.join(__dirname, '/build/index.html'));*/
})

app.get('/authcheck', (req, res) => {      
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True"
    } else {
        sendData.isLogin = "False"
    }
    res.send(sendData);
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const sendData = { isLogin: "" };

    console.log(email , password);

    if (email && password) {             // id와 pw가 입력되었는지 확인
        db.query('SELECT * FROM userTable WHERE email = ?', [email], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.      

                console.log(results);

                bcrypt.compare(password , results[0].password, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교

                    if (result === true) {                  // 비밀번호가 일치하면
                        req.session.is_logined = true;      // 세션 정보 갱신
                        req.session.nickname = email;
                        req.session.save(function () {
                            sendData.isLogin = "True"
                            res.send(sendData);
                        });
                      /*  
                      db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
                            , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                      */
                    }
                    else{                                   // 비밀번호가 다른 경우
                        sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                        res.send(sendData);
                    }
                })                      
            } else {    // db에 해당 아이디가 없는 경우
                sendData.isLogin = "아이디 정보가 일치하지 않습니다."
                res.send(sendData);
            }
        });
    } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }
});

app.post("/signup", (req, res) => {  // 데이터 받아서 결과 전송
    const username = req.body.userName;
    const useremail = req.body.userEmail;
    const password = req.body.userPassword;
    
    const sendData = { isSuccess: "" };

    console.log(username , useremail , password);

    if (username && password && useremail) {
        db.query('SELECT * FROM userTable WHERE email = ?', [useremail], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;

            if (results.length <= 0) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
                const hasedPassword = bcrypt.hashSync(password, 10);    // 입력된 비밀번호를 해시한 값
                db.query('INSERT INTO userTable (username, password, email) VALUES(?,?,?)', [username, hasedPassword, useremail], function (error, data) {
                    if (error) throw error;
                    req.session.save(function () {                        
                        sendData.isSuccess = "True"
                        res.send(sendData);
                    });
                });
                sendData.isSuccess = "로그인 성공"
                res.send(sendData);
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
                sendData.isSuccess = "이미 존재하는 아이디 입니다!"
                res.send(sendData);  
            }            
        });        
    } else {
        sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);  
    }
    
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})