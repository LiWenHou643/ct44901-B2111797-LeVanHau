class AuthService {
    constructor(client) {
        this.Reader = client.db().collection('docgia');
        this.Employee = client.db().collection('nhanvien');
    }

    extractAuthData(payload) {
        const acc = {
            dienthoai: payload.dienthoai,
            matkhau: payload.matkhau,
        };

        Object.keys(acc).forEach(
            (key) => acc[key] === undefined && delete acc[key]
        );

        return acc;
    }

    async login(payload) {
        const acc = this.extractAuthData(payload);

        let user;

        const nv = await this.Employee.findOne({
            dienthoai: acc.dienthoai,
            matkhau: acc.matkhau,
        });

        const dg = await this.Reader.findOne({
            dienthoai: acc.dienthoai,
            matkhau: acc.matkhau,
        });

        if (!nv && !dg) {
            throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }

        user = nv || dg;
        user = {
            ...user,
            hoten: user?.hotennv || user?.holot + ' ' + user?.ten,
            loai: nv ? 'nhanvien' : 'docgia',
            holot: undefined,
            ten: undefined,
            hotennv: undefined,
            matkhau: undefined,
        };

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );

        return {
            ...user,
            matkhau: undefined,
        };
    }
}

module.exports = AuthService;
