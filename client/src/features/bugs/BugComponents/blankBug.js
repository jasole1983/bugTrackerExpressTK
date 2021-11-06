class BlankBug {

    constructor(currentUser) {
        this.name= '';
        this.details= '';
        this.steps= '';
        this.version= '';
        this.priority= 0;
        this.assignedTo= 0;
        this.createdBy= currentUser.id || 5;
    }
}

export default BlankBug