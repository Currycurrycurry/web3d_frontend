const getters = {
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    model: state => state.user.model,
    token: state => state.user.token,
    email:state => state.user.email,
    fullName:state => state.user.fullName,
    age:state => state.user.age,
    gender:state => state.user.gender,
    region: state => state.user.region,
    authority:state => state.user.authority,

}
export default getters
