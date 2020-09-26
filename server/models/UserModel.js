var mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    isConfirmed:{type:Boolean,require:true,default:0},
    confirmOTP:{type:String,require:false},
    otpTries:{type:Number,require:false,default:0},
    status:{type:Boolean,require:true,default:1},
}, {timestamps: true});

UserSchema
    .virtual("fullName")
    .get(function (){
        return this.firstName+" "+this.lastName;
    });

module.exports=mongoose.model("User",UserSchema);