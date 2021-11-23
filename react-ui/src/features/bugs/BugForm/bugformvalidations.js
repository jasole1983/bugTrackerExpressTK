const bugFormValidators = {
    name: {
        check: (n) => n.length < 255 && n.length > 0,
        message: "Name is a required field and must be less than 255 characters.",
    },
    details: {
        check: (n) => n.length > 0,
        message: "Details is a required field.",
    },
    steps: {
        check: (n) => n.length > 0,
        message: "Steps is a required field.",
    },
    version: {
        check: (n) => n.length > 0 && n.length <= 15,
        message: "Version is a required field and must be less than 15 characters.",
    },
    assignedTo: {
        check: (u) => {if(u.admin) return true},
        message: "Must have Admin priveleges to assign to user."
    },
    priority: {
        check: (x) => x > 0,
        message: "Priority Level must be set.  Please select an option."
    }
}

export default bugFormValidators