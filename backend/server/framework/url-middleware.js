const URL=require('node:url')
module.exports=(baseAdress)=>{(req,res,next)=>{
  const url=new URL(req.url,baseAdress)
  // const readyContent=url.hash.split('').splice(0,1).join('')
  // req.hash=readyContent
}}