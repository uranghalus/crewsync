const department = [
  { department_name: 'Human Resources' },
  { department_name: 'Finance' },
  { department_name: 'IT' },
  { department_name: 'Marketing' },
  { department_name: 'Tenancy' },
];
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}
const users = [
  {
    name: 'Muhammad Fauzan',
    email: 'admin@top-app.com',
    password: 'admin123',
    role: Role.ADMIN,
    departmentId: 1,
  },
];
export { department, users };
