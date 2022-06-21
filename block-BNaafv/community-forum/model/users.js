var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = new schema({
    username:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String},
    name:{type:String},
    image:{type:String},
    bio:{type:String}
}, {timestamps:true});

userSchema.pre('save', async function(next){
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.verifypassword = async function(password){
    var result = await bcrypt.compare(password, this.password);
    return result;
}

userSchema.methods.tokenverify = async function(){
    var payload = {userId: this.id, email:this.email};
    try {
        var token = jwt.sign(payload, "thisisapp");
        return token;
    } catch (error) {
        return error;
    }
}

module.exports = mongoose.model('user', userSchema);