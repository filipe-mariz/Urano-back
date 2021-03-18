import User from '../model/UserModel'

export default {
    Render(user: User) {
        return {
            nome: user.name,
            email: user.email,
            number: user.number,
            userName: user.userName
        }
    },

    renderMany(user: User[]) {
        return user.map((user) => this.Render(user));
    }
}
