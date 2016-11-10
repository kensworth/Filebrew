<h1> File Brew </h1>

<h2>Overview</h2>
Sending files over the internet is hard. File Brew makes it easy! Users can send files to each other peer to peer using just their browsers! Just drop in a file, and send your friend a link!
We even support user accounts if you're too lazy to send a link, pending files will be shown once you log in!

<h2>Data Model</h2>

  First draft schema:
  
    // users
    // * our site requires authentication...
    // * so users have a username, password, and a salt
    // * they have a friends list of friends who they can send files to
    const User = new mongoose.Schema({
        //username, password provided by plugin
        lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
    });

<h2>Wireframes</h2>

To be added.

<h2>Site Map </h2>
* Home
  * Log In
    * Profile
    * Pending File Requests
  * Register
  * Send File

<h2>User Stories</h2>
>1. as a user, I can send a file without being logged in by dropping a file and sending a link.
>2. as a user, I can directly send a file to a friend if we're both logged in.


<h2>Research Topics</h2>
>1. Use bcrypt hashing
>2. Use WebTorrent/WebRTC
>3. Use Reactjs/Redux


