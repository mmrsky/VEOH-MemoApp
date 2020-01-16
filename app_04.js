const http = require('http');
const fs = require('fs');

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
            <body>
                <form action="add-note" method="POST">
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
            const body = Buffer.concat(chunks);
            console.log(body);
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