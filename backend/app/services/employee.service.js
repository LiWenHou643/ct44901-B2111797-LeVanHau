const { ObjectId } = require('mongodb');

class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection('nhanvien');
    }

    extractemployeeData(payload) {
        const employee = {
            hotennv: payload.hotennv,
            matkhau: payload.matkhau,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai,
        };

        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );

        return employee;
    }

    async create(payload) {
        const phoneNumber = payload.dienthoai;

        const existingEmployee = await this.Employee.findOne({
            dienthoai: phoneNumber,
        });

        if (existingEmployee) {
            throw new Error(
                `Đã tồn tại nhân viên với số điện thoại ${phoneNumber}`
            );
        }

        const employee = this.extractemployeeData(payload);

        const result = await this.Employee.insertOne(employee);

        const insertedEmployee = await this.Employee.findOne({
            _id: result.insertedId,
        });

        return {
            msnv: insertedEmployee._id,
            hotennv: insertedEmployee.hotennv,
            matkhau: insertedEmployee.matkhau,
            chucvu: insertedEmployee.chucvu,
            diachi: insertedEmployee.diachi,
            dienthoai: insertedEmployee.dienthoai,
        };
    }

    async find(filter) {
        const employees = await this.Employee.find({
            chucvu: 'Nhân viên',
            ...filter,
        }).toArray();
        const result = employees.map((employee) => ({
            msnv: employee._id,
            hotennv: employee.hotennv,
            matkhau: employee.matkhau,
            chucvu: employee.chucvu,
            diachi: employee.diachi,
            dienthoai: employee.dienthoai,
        }));

        return result;
    }

    async findByName(name) {
        const filter = {
            hotennv: { $regex: new RegExp(name, 'i') },
        };

        const employees = await this.Employee.find(filter).toArray();

        const result = employees.map((employee) => ({
            msnv: employee._id,
            hotennv: employee.hotennv,
            matkhau: employee.matkhau,
            chucvu: employee.chucvu,
            diachi: employee.diachi,
            dienthoai: employee.dienthoai,
        }));

        return result;
    }

    async findById(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Sai định dạng id');
        }

        const employee = await this.Employee.findOne({
            _id: new ObjectId(id),
        });

        if (!employee) {
            throw new Error('Không tìm thấy nhân viên');
        }

        return {
            msnv: employee._id,
            hotennv: employee.hotennv,
            matkhau: employee.matkhau,
            chucvu: employee.chucvu,
            diachi: employee.diachi,
            dienthoai: employee.dienthoai,
        };
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const phoneNumber = payload.dienthoai;

        const existingEmployee = await this.Employee.findOne({
            dienthoai: phoneNumber,
        });

        if (existingEmployee && existingEmployee._id.toString() !== id) {
            throw new Error(
                `Đã tồn tại nhân viên với số điện thoại ${phoneNumber}`
            );
        }

        const updateEmployee = this.extractemployeeData(payload);
        const updatedEmployee = await this.Employee.findOneAndUpdate(
            filter,
            {
                $set: updateEmployee,
            },
            {
                returnDocument: 'after',
            }
        );

        return {
            msnv: updatedEmployee._id,
            hotennv: updatedEmployee.hotennv,
            matkhau: updatedEmployee.matkhau,
            chucvu: updatedEmployee.chucvu,
            diachi: updatedEmployee.diachi,
            dienthoai: updatedEmployee.dienthoai,
        };
    }

    async delete(id) {
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Employee.deleteMany({
            chucvu: 'Nhân viên',
        });
        return result.deletedCount;
    }
}

module.exports = EmployeeService;
