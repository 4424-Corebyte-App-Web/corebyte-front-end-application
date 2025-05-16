export class Profile {
    constructor(
        {
            id = '',
            name = '',
            email = '',
            phone = '',
            avatar = '',
            accountType = 'basic',
        } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role =role;
    }
}
