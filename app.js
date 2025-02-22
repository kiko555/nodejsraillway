const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

app.post('/OrderInitial.aspx', async (req, res) => {
    console.log('Received POST request:', req.body);
    
    const responseData = {
        strRsXML: `<?xml version='1.0' encoding='UTF-8'?><CUBXML><CAVALUE>b041e60ef25eec79733daf1864ac0a1c</CAVALUE><ORDERINFO><STOREID>250700008</STOREID><ORDERNUMBER>122A23083084</ORDERNUMBER><AMOUNT>201</AMOUNT></ORDERINFO><AUTHINFO><AUTHSTATUS>0000</AUTHSTATUS><AUTHCODE>773091</AUTHCODE><AUTHTIME>20250213230928</AUTHTIME><AUTHMSG>授權成功</AUTHMSG><CARDNO>559980******5107</CARDNO></AUTHINFO></CUBXML>`,
        strRsJSON: null,
        strOrderInfo: `<?xml version='1.0' encoding='UTF-8'?><CUBXML><CAVALUE>eea326620371ca56d71bf4a65bef9e9e</CAVALUE><ORDERINFO><STOREID>250700008</STOREID><ORDERNUMBER>122A23083084</ORDERNUMBER></ORDERINFO></CUBXML>`
    };
    
    try {
        // const callbackResponse = await axios.post('https://stage.comicrevive.com', responseData, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // console.log('Callback response:', callbackResponse.data);
        
        // Redirect using a POST request
        res.setHeader('Content-Type', 'text/html');
        res.send(`
            <html>
                <body onload="document.forms[0].submit()">
                    <form method="POST" action="https://stage.comicrevive.com/line_cathaypay_callback2nd">
                        <input type="hidden" name="strRsXML" value='${responseData.strRsXML.replace(/'/g, '&apos;')}'>
                        <input type="hidden" name="strRsJSON" value='${responseData.strRsJSON}'>
                        <input type="hidden" name="strOrderInfo" value='${responseData.strOrderInfo.replace(/'/g, '&apos;')}'>
                    </form>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error in callback:', error.message);
        res.status(500).send('Error processing request');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

