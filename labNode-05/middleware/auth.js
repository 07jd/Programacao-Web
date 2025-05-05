const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"]; //Bearer {TOKEN}
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).send("Não existe um Token!");
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if(err){

      if (err.message === "jwt expired") {
        const newToken = jwt.sign({
          id: user.id,
          nome: user.nome,
          email: user.email
        },
        SECRET_KEY,
      { expiresIn: "1h"}
      );



      res.setHeader("Authorization", `Bearer ${newToken}`);
      req.user = user;
      next();
      }

      return res.status(401).send("Token invalido!");
    }

    req.user = user;
    next();
  });
}

module.exports = verificarToken;