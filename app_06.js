const http = require('http');
const fs = require('fs');

const notes = [];

const server = http.createServer((request, response)=>{
    const url = request.url;
    const method = request.method;
    console.log("HTTP request url:" + url + " method: " + method);

    if(url === '/'){
        response.write(`
        <html>
            <head>
                <title>MemoApp</title>
            </head>
            <body>`);
        notes.forEach((value, index)=>{
            response.write(`<div>note: ${value}, index: ${index}</div>`);
        });
        response.write(`      <form action="add-note" method="POST">
                    <input type="text" name="note"></input>
                    <button type="submit">Add note</button>
                </form>
            </body>
        </html>`);
        response.statusCode = 200;
        response.end();
        return;
    } else if(url === '/add-note') {
        console.log("/add-note");
        const chunks = [];
        request.on('data', (chunk)=>{
            chunks.push(chunk);
        });
        request.on('end',()=>{
            const body = Buffer.concat(chunks).toString();
            const note = body.split('=')[1];
            notes.push(note);
            response.statusCode = 303; //  Redirect
            response.setHeader('Location', '/');
            response.end();
        });
        return;
    } else if (url === '/favicon.ico') {
        fs.readFile('./favicon.ico', (err, data)=>{
            response.write(data);
            response.end();
            return;
        });

    }

    console.log(`${url} not found`);
    response.write(`
        
    <html>
        <head>
            <title>MemoApp 404</title>
        </head>
        <body>
            <h1>404 - page not found</h1>
        </body>
    </html>`);
    response.statusCode = 404;
    response.end();

});

server.listen(8080);