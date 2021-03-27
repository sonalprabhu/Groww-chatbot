const {app} = require('./app');
const PORT = process.env.PORT_NO || 8081;//default port set to 8081

const server = app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
});

module.exports = server;