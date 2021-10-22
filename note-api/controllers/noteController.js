let NoteModel = require('../models/note');
let User = require('../models/user');

exports.save = async (req, res) =>{
    try{
     await NoteModel.create({
       title:req.body.title,
       note:req.body.note,
       completed:false,
       type:req.body.type,
       color:req.body.color,
       user:req.body.user
     })
    //  await User.findByIdAndUpdate(req.body.user, { $push: { notes: note } },
    //   { new: true, useFindAndModify: false }).lean();
     return res.status(200).send();
    }catch(err){
      if(err){
        if(err.name === 'ValidationError'){
            return res.status(400).send(Object.values(err.errors).map(val => val.message));
        }
    }
    console.log(err)
    res.send(err).status(500);
    }
}


exports.update = async (req, res) => {
  try{
    await NoteModel.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
    res.status(200).send();
  }catch(err){
    console.log(err)
    res.send(err).status(500);
  }
}

exports.delete = async (req, res) => {
try{
 await NoteModel.findByIdAndRemove(req.params.id,{new: true, useFindAndModify: false});
 req.status(200).send();
}catch(err){
  console.log(err)
  res.send(err).status(500);
}
}

exports.load = async (req, res) =>{
  try{
   let notes = await NoteModel.find({user: req.user._id});
   res.send({notes});
  }catch(err){
    console.log(err)
    res.send(err).status(500);
  }
}