 const asyncHandler = require('express-async-handler')

//@desc  Get goals
//@route  Get/api/goals
//acces  private
const getGoals =  asyncHandler( async (req, res)=>{
    res.status(200).json({msg: 'Get goals'})
})

//@desc   Setgoal
//@route  POST/api/goals
//acces  private
const setGoal =   asyncHandler( async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('PLease a texr field')

    }
    res.status(200).json({msg: 'Set goal'})
})

//@desc  Updateals
//@route  PUT/api/goals/:id
//acces  private
const updateGoal =   asyncHandler( async(req, res)=>{
    res.status(200).json({msg: `Update goals ${req.params.id}`})
})

//@desc  Delete goals
//@route  Delete api/goals/:id
//acces  private
const deleteGoal = asyncHandler( async(req, res)=>{
    res.status(200).json({msg: `Delete goals ${req.params.id}`})
})


module.exports ={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
} 