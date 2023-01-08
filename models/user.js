const mongoose =  require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        minilength:[5, 'usernames should be longer than 5 character']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },  
    batch: {
        type: String,
         
    },  
    course: {
        type: String,
       
    },  
    
    isAdmin:{
        type: Boolean,
        require:true,
        default:false
    }   
});
//encryting password
userSchema.pre("save", async function(name) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    // this.password = await bcrypt.hash(this.password, salt)
    const password = await req.body.password;

});

 

//comapring password

userSchema.methods.matchpassword = async function(enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

}

module.exports = mongoose.model('User', userSchema)