const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(router);

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];



router.get('/api/users', function(req, res){
    res.status(200).json({
        "status":true,
        "users":users
    })
});


app.get('/api/users/:id', function(req, res){
    
    const id = parseInt(parseInt(req.params.id))
    
    if (isNaN(id)) {
        res.status(400).json({
            "status":true, 
            error: 'Invalid user ID' });
        return;
      }

      
    const user = users.find(user => user.id === id);

    if(user){
        res.status(200).json({
            "status":true,
             user
        });        
    }
    else
        res.status(400).json({
            "status":true,
            "error":"User not found"
        }); 
});



app.all('*', (req, res)=>{
    res.status(404).json({
        "status":true,
        "error":"Page not found"
    }); 
})


app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
});