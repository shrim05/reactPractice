import mongoose, {Schema} from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
    salt: String,
});

UserSchema.methods.generateToken = function(){
    const token = jwt.sign(
        //첫번째 파라미터에는 토큰안에 집어넣고 싶은 데이터
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET, //두번째 jwt암호
        {
            expiresIn: '1d', //유효기간
        },
    );
    return token;
};

//인스턴스 메서드 구현 시 화살표 함수가 아닌 function 사용 (함수 내부에서 this에 접근해야하기때문)
UserSchema.methods.setPassword = async function(password) {
    this.salt = await crypto.randomBytes(16).toString('hex');
    const hash = await crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password){
    const incomePassword= await crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    const result = this.hashedPassword == incomePassword;
    return result;
}

UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    delete data.salt;
    return data;
}

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({username});
  }
  
const User = mongoose.model('User',UserSchema);
export default User;
