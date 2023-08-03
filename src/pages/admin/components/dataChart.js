import { getMentors, getAdmins, getStaffs, getAllUser, getCustomers } from "../../../helper/helper";
export const getData = async (roleId) => {
    
    let query = { 'fullName': '', 'active': 1 };
    let customer = await getCustomers(query);
    let mentor = await getMentors(query);
    let staff = await getStaffs(query);
    let admin = await getAdmins(query);
    let user = await getAllUser(query);
    roleId.push({ roleId: 'Admin', number: admin.data.length });
    roleId.push({ roleId: 'Staff', number: staff.data.length });
    roleId.push({ roleId: 'Mentor', number: mentor.data.length });
    roleId.push({ roleId: 'Customer', number: customer.data.length });
    roleId.push({ roleId: 'Sum', number: user.data.length });
}
export const roleId = [
    { roleId: 'Admin', number: 1 },
    { roleId: 'Customer', number: 32 },
    { roleId: 'Mentor', number: 5 },
    { roleId: 'Staff', number: 9 },
    { roleId: 'All', number: 47 },
]