const getters = {
    user_id: state => state.user.user_id,
    username: state => state.user.username,
    model: state => state.user.model,
    token: state => state.user.token,
    email:state => state.user.email,
    fullName:state => state.user.fullName,
    age:state => state.user.age,
    gender:state => state.user.gender,
    region: state => state.user.region,
}
export default getters
