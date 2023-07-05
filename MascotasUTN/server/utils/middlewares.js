const jwt = require('jsonwebtoken');
const {SECRET} = require('../utils/config');

const handler404 =((req, resp)=>{
    resp.status(404).json({ error:"Ruta invalida"});
  })

 const handlerError =(error, req, resp, next)=>{
   if(error.name === "CastError"){
    resp.status(400).send({error: "Error en ID"})
    console.log("ERROR ID")
   } else if (error.name === "SyntaxError"){
     resp.status(400).send({error: "SyntaxError"})
     }  else if (error.name === "SyntaxError"){
        resp.status(400).send({error: "SyntaxError"})
       }
     else if (error.name === "BadRequest"){
        resp.status(400).send({error: "BadRequest"})
       }
      else if(error.name === "ValidationError"){
     resp.status(400).send({error: "ValidationError"})
   }  
   else if(error.name === "ErrorToken"){
    resp.status(400).send({error: "ErrorToken"})
  }  
   else{
     resp.status(500).json({error: error.message})
   }
    next();
 }

  const verifyToken = async(req, resp, next)=>{
    const bearerToken = req.headers['authorization']; // no existe el campo token de la request se lo estoy agregando aca es como el body
    if(typeof bearerToken !== 'undefined'){
      req.token = bearerToken.split(" ")[1];
      try {
        const data  = await jwt.verify(req.token, SECRET)
        console.log(data);
        next();
      } catch (error) {
        next(error)}
    } else{
      next({name: "Error Token", message: `no token ${bearerToken}` })
    }
  }

 module.exports ={
  handlerError, 
  handler404,
  verifyToken}