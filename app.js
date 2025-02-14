const express = require('express');
const axios = require('axios');
// const path = require('path');
// const indexRouter = require('./routes/index');

const app = express();
const PORT = 3000;

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Use the router for handling routes
// app.use('/', indexRouter);

// // Catch-all route for handling 404 errors
// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
//   });

// Middleware to parse JSON body
app.use(express.json());

app.post('/OrderInitial.aspx', async (req, res) => {
    console.log('Received POST request:', req.body);
    
    const responseData = {
        "strRsXML": "<?xml version='1.0' encoding='UTF-8'?><CUBXML><CAVALUE>b041e60ef25eec79733daf1864ac0a1c</CAVALUE><ORDERINFO><STOREID>250700008</STOREID><ORDERNUMBER>122A23083084</ORDERNUMBER><AMOUNT>201</AMOUNT></ORDERINFO><AUTHINFO><AUTHSTATUS>0000</AUTHSTATUS><AUTHCODE>773091</AUTHCODE><AUTHTIME>20250213230928</AUTHTIME><AUTHMSG>授權成功</AUTHMSG><CARDNO>559980******5107</CARDNO></AUTHINFO></CUBXML>",
        "strRsJSON": null,
        "strOrderInfo": "<?xml version='1.0' encoding='UTF-8'?><CUBXML><CAVALUE>eea326620371ca56d71bf4a65bef9e9e</CAVALUE><ORDERINFO><STOREID>250700008</STOREID><ORDERNUMBER>122A23083084</ORDERNUMBER></ORDERINFO></CUBXML>"
    };
    
    try {
        const callbackResponse = await axios.post('https://stage.comicrevive.com/line_cathaypay_callback', responseData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Callback response:', callbackResponse.data);
    } catch (error) {
        console.error('Error in callback:', error.message);
    }
    
    res.json(responseData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

