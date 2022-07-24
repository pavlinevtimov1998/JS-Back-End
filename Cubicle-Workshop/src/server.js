const app = require('express')();
const port = 3000;

app.get('/', (req, res) => {
    res.send('it works');
})







app.listen(port, () => console.log(`Server listen on port ${port}...`))