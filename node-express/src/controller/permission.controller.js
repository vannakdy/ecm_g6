
const Menu = {
    Admin : [
        "Dashboard",
        "Sale",
        "Employee",
        "Product",
        "Category",
        "Report",
        "Account",
        "Setting",
    ],
    Manager : [
        "Sale",
        "Product",
        "Category",
        "Report",
        "Setting"
    ],
    Cashiar:[
        "Sale",
        "Product",
        "Category",
        "Setting"
    ],
    Service:[
        "Product",
        "Category",
        "Setting"
    ]

}
const getPermissionMenuByRoleCode = (Role) => {
    return Menu[Role]
}

module.exports = {
    getPermissionMenuByRoleCode
}

