 const asyncHandler = require('express-async-handler')
 const Goal = require('../models/goalModel')
 const User = require('../models/userModel')


//@desc  Get goals
//@route  Get/api/goals
//acces  private
const getGoals =  asyncHandler( async (req, res)=>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@desc   Setgoal
//@route  POST/api/goals
//acces  private
const setGoal =   asyncHandler( async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('PLease  add text field')
    }
    const goal =  await Goal.create({
     text: req.body.text,
     user: req.user.id
    })
    res.status(200).json(goal)
})

//@desc  Updateals
//@route  PUT/api/goals/:id
//acces  private
const updateGoal =   asyncHandler( async(req, res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }    
    const user = await User.findById(req.user.id)  
    //check for user
    if(!user){
        res.status(401)
        throw new Error('user does not exist')
    }   
        // if user loged in  does not match with goal user
        if(goal.user.string() !== user.id) {
           res.status(401)
           throw new Error('User loged in  does not match with goal user')
        }                                 
    const updatedGoal = await  Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,}) // id to update     et value in body to update 
    res.status(200).json(updatedGoal)
})

//@desc  Delete goals
//@route  Delete api/goals/:id
//acces  private
const deleteGoal = asyncHandler( async(req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id) 
    //check for user
    if(!user){
        res.status(401)
        throw new Error('user does not exist')
    }   
        // if user loged in  does not match with goal user
        if(goal.user.string() !== user.id) {
       
           res.status(401)
           throw new Error('User loged in  does not match with goal user')
        } 
        await goal.remove()
        // res.status(200).json(goal)
         //const goal = await Goal.remove({id: req.params.id})
         res.status(200).json({id: req.params.id})
        
})


module.exports ={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
} 