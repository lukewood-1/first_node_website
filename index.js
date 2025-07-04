import http from 'http';
import path from 'path';
import fs from 'fs';
import url from 'url';
import querystring from 'querystring'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;

const serve = url => {
  try{
    const data = fs.readFileSync(
      url, 'utf8', (err, data) => err ? console.error(err) : data
    );
    return data;
  } catch (e) {
    throw new Error('Page file not loaded');
  }
};

const server = http.createServer((req, res) => {
  let page = '';
  let isOk = true;
  
  if(req.method === 'GET'){
    switch(req.url){
      case '/':
        page = serve(path.join(__dirname, 'public', 'index.html'));
        break;
      case '/about':
        page = serve(path.join(__dirname, 'public', 'about.html'));
        break;
      case '/contact-me':
        page = serve(path.join(__dirname, 'public', 'contact-me.html'));
        break;
      default:
        page = serve(path.join(__dirname, 'public', '404.html'));
        isOk = false;
        break;
    }
    res.writeHead(
      (isOk ? 200 : 404), {'Content-Type': 'text/html'}
    );
    res.write(page);
    res.end();
  }else {
    res.writeHead(403, {'Content-Type': 'text/plain'});
    res.write('Only GET requests are allowed.');
    res.end();
  }
})

server.listen(8080, () => console.log(`Listening on port ${PORT}`));