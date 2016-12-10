<h1> File Brew </h1>

<h2>Overview</h2>
Sending files over the internet is hard. File Brew makes it easy. Users can send files to each other peer to peer using just their browsers. Just drop in a file, and send your friend a link! File Brew will be built using WebTorrent, turning your browser into a client on a peer-to-peer network!

<h2>Site Map </h2>
* Send File
* Receive File

<h2>User Stories</h2>
1. As a user, I can send a file by dropping a file and sending a link.

<h2>Research Topics</h2>
<h3>WebTorrent</h3>
Use WebTorrent, a BitTorrent client in the browser written using the WebRTC API. A user can turn their browser into a peer on the network by dropping a file into their browser. A magnet link is created and will be sent to the server to be hashed and turned into a URI that references the file.
<h3>React </h3>
The page will be built using React components. This includes the page overlay, drop-zone, coffee cup image, and progress bar.
<h3>AJAX</h3>
I will use AJAX to send asynchronous requests to the server for hashing, or magnet link retrieval.
<h3>Redis</h3>
I will be using Redis as a durable, in memory key-value store from hashes to magnet URIs.
<h3>Heroku</h3>
I will be using Heroku to host this site.
