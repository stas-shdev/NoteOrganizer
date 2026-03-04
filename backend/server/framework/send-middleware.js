module.exports=(req,res,next)=>{
  res.send=(answer)=>{res.end(JSON.stringify(answer))}
  next()
}