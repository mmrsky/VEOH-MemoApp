const http = require('http');

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
        response.end();
    }

});

server.listen(8080);